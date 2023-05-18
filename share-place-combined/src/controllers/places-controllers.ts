import { RequestHandler } from "express-serve-static-core";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

import HttpError from "../models/http-error";
import PlaceModel from "../models/place-model";
import UserModel from "../models/user-model";
import * as fileHelper from "../util/file-helper";

export const getPlaceById: RequestHandler = async (req, res, next) => {
  try {
    const placeId = req.params.placeId;
    const place = await PlaceModel.findById(placeId).exec();
    if (!place) {
      return next(
        new HttpError("Could not find a place for the provided id.", 404)
      );
    }
    return res.status(200).json({ place: place.toObject({ getters: true }) });
  } catch (error: any) {
    return next(
      new HttpError(
        `Something went wrong, could not find the place.\nInternal Server Error: ${error.message}`,
        500
      )
    );
  }
};

export const getPlacesByUserId: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.uId;
    const userWithPlaces = await UserModel.findById(userId, "-password")
      .populate("places")
      .exec();
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
      return next(
        new HttpError("Could not find a places for the provided user id.", 404)
      );
    }
    return res.json({
      places: userWithPlaces.places.map((place) =>
        place.toObject({ getters: true })
      ),
    });
  } catch (error: any) {
    return next(
      new HttpError(
        `Something went wrong, please try again later.\nInternal Server Error: ${error.message}`,
        500
      )
    );
  }
};

export const createPlace: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, latitude, longitude } = req.body;
  const coordinates = { latitude, longitude };
  try {
    const createdPlace = new PlaceModel({
      title,
      description,
      address,
      location: coordinates,
      image: req.file?.path.toString().replace(/\\/g, "/"),
      creator: req.userData?.userId,
    });

    const user = await UserModel.findById(req.userData?.userId).exec();

    if (!user) {
      return next(new HttpError("Could not find user for provided id.", 404));
    }

    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session: session });
    user.places.push(createdPlace._id);
    await user.save({ session: session });
    await session.commitTransaction();

    return res.status(201).json({ place: createdPlace });
  } catch (error: any) {
    return next(
      new HttpError(
        `Creating place failed, please try again.\nInternal Server Error: ${error.message}`,
        500
      )
    );
  }
};

export const updatePlaceById: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  try {
    const placeId = req.params.placeId;
    const { title: updatedTitle, description: updatedDescription } = req.body;

    const place = await PlaceModel.findById(placeId).exec();
    if (!place) {
      return next(new HttpError("Place Not Found", 404));
    }
    if (place.creator.toString() !== req.userData?.userId?.toString()) {
      return next(new HttpError("You are not allowed to edit this place", 401));
    }
    place.title = updatedTitle;
    place.description = updatedDescription;
    await place.save();

    return res.status(200).json({
      place: place.toObject({ getters: true }),
    });
  } catch (error: any) {
    return next(
      new HttpError(
        `Something went wrong, could not update place.\nInternal Server Error: ${error.message}`,
        500
      )
    );
  }
};

export const deletePlaceById: RequestHandler = async (req, res, next) => {
  try {
    const placeId = req.params.placeId;
    const deletedPlace = await PlaceModel.findById(placeId)
      .populate("creator")
      .exec();
    if (!deletedPlace) {
      return next(new HttpError("Place does not exist", 404));
    }
    if (deletedPlace.creator.id !== req.userData?.userId) {
      return next(
        new HttpError("You are not allowed to delete this place", 401)
      );
    }

    const imagePath = deletedPlace.image;

    const session = await mongoose.startSession();
    session.startTransaction();
    await deletedPlace.deleteOne({ session: session });
    deletedPlace.creator.places.pull(deletedPlace._id);
    await deletedPlace.creator.save({ session: session });
    await session.commitTransaction();
    fileHelper.deleteFile(imagePath);

    return res.status(200).json({
      message: "Place deleted successfully",
    });
  } catch (error: any) {
    return next(
      new HttpError(
        `Something went wrong, could not delete place.\nInternal Server Error: ${error.message}`,
        500
      )
    );
  }
};
