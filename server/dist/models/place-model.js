"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const placeSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: {
        type: [Number, Number],
        required: true,
    },
    creator: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, { timestamps: true });
const PlaceModel = (0, mongoose_1.model)("Place", placeSchema);
exports.default = PlaceModel;
