import { Document, Model, Schema, Types, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import bcrypt from "bcryptjs";

import { PlaceDocument } from "./place-model";

export interface UserDocument extends Document {
  name: string;
  email: string;
  password: string;
  image: string;
  places: Types.Array<PlaceDocument>;
  matchPassword: (plainPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    image: {
      type: String,
      required: true,
    },
    places: [
      {
        type: Types.ObjectId,
        required: true,
        ref: "Place",
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

userSchema.pre<UserDocument>("save", async function save(next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12); // 12 Salting Rounds
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.matchPassword = async function (
  plainPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainPassword, this.password);
};

const UserModel = model<UserDocument>("User", userSchema);

export default UserModel;
