"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlaceById = exports.updatePlaceById = exports.createPlace = exports.getPlacesByUserId = exports.getPlaceById = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const http_error_1 = __importDefault(require("../models/http-error"));
const place_model_1 = __importDefault(require("../models/place-model"));
const user_model_1 = __importDefault(require("../models/user-model"));
const fileHelper = __importStar(require("../util/file-helper"));
const getPlaceById = async (req, res, next) => {
    try {
        const placeId = req.params.placeId;
        const place = await place_model_1.default.findById(placeId).exec();
        if (!place) {
            return next(new http_error_1.default("Could not find a place for the provided id.", 404));
        }
        return res.status(200).json({ place: place.toObject({ getters: true }) });
    }
    catch (error) {
        return next(new http_error_1.default(`Something went wrong, could not find the place.\nInternal Server Error: ${error.message}`, 500));
    }
};
exports.getPlaceById = getPlaceById;
const getPlacesByUserId = async (req, res, next) => {
    try {
        const userId = req.params.uId;
        const userWithPlaces = await user_model_1.default.findById(userId, "-password")
            .populate("places")
            .exec();
        if (!userWithPlaces || userWithPlaces.places.length === 0) {
            return next(new http_error_1.default("Could not find a places for the provided user id.", 404));
        }
        return res.json({
            places: userWithPlaces.places.map((place) => place.toObject({ getters: true })),
        });
    }
    catch (error) {
        return next(new http_error_1.default(`Something went wrong, please try again later.\nInternal Server Error: ${error.message}`, 500));
    }
};
exports.getPlacesByUserId = getPlacesByUserId;
const createPlace = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.default("Invalid inputs passed, please check your data.", 422));
    }
    const { title, description, address, latitude, longitude } = req.body;
    const coordinates = { latitude, longitude };
    try {
        const createdPlace = new place_model_1.default({
            title,
            description,
            address,
            location: coordinates,
            image: req.file?.path.toString().replace(/\\/g, "/"),
            creator: req.userData?.userId,
        });
        const user = await user_model_1.default.findById(req.userData?.userId).exec();
        if (!user) {
            return next(new http_error_1.default("Could not find user for provided id.", 404));
        }
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        await createdPlace.save({ session: session });
        user.places.push(createdPlace._id);
        await user.save({ session: session });
        await session.commitTransaction();
        return res.status(201).json({ place: createdPlace });
    }
    catch (error) {
        return next(new http_error_1.default(`Creating place failed, please try again.\nInternal Server Error: ${error.message}`, 500));
    }
};
exports.createPlace = createPlace;
const updatePlaceById = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.default("Invalid inputs passed, please check your data.", 422));
    }
    try {
        const placeId = req.params.placeId;
        const { title: updatedTitle, description: updatedDescription } = req.body;
        const place = await place_model_1.default.findById(placeId).exec();
        if (!place) {
            return next(new http_error_1.default("Place Not Found", 404));
        }
        if (place.creator.toString() !== req.userData?.userId?.toString()) {
            return next(new http_error_1.default("You are not allowed to edit this place", 401));
        }
        place.title = updatedTitle;
        place.description = updatedDescription;
        await place.save();
        return res.status(200).json({
            place: place.toObject({ getters: true }),
        });
    }
    catch (error) {
        return next(new http_error_1.default(`Something went wrong, could not update place.\nInternal Server Error: ${error.message}`, 500));
    }
};
exports.updatePlaceById = updatePlaceById;
const deletePlaceById = async (req, res, next) => {
    try {
        const placeId = req.params.placeId;
        const deletedPlace = await place_model_1.default.findById(placeId)
            .populate("creator")
            .exec();
        if (!deletedPlace) {
            return next(new http_error_1.default("Place does not exist", 404));
        }
        if (deletedPlace.creator.id !== req.userData?.userId) {
            return next(new http_error_1.default("You are not allowed to delete this place", 401));
        }
        const imagePath = deletedPlace.image;
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        await deletedPlace.deleteOne({ session: session });
        deletedPlace.creator.places.pull(deletedPlace._id);
        await deletedPlace.creator.save({ session: session });
        await session.commitTransaction();
        fileHelper.deleteFile(imagePath);
        return res.status(200).json({
            message: "Place deleted successfully",
        });
    }
    catch (error) {
        return next(new http_error_1.default(`Something went wrong, could not delete place.\nInternal Server Error: ${error.message}`, 500));
    }
};
exports.deletePlaceById = deletePlaceById;
