import { Document, Schema, Types, model } from "mongoose";
import { UserDocument } from "./user-model";

export interface PlaceDocument extends Document {
  title: string;
  description: string;
  image: string;
  address: string;
  location: [Number, Number];
  creator: UserDocument;
}

const placeSchema = new Schema<PlaceDocument>(
  {
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
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const PlaceModel = model<PlaceDocument>("Place", placeSchema);

export default PlaceModel;
