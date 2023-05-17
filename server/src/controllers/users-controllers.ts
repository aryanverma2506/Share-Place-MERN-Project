import { RequestHandler } from "express-serve-static-core";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";
import UserModel from "../models/user-model";

const expirationTimeInMs = 1000 * 60 * 60;

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await UserModel.find({}, "-password");
    res
      .status(200)
      .json({ users: users.map((user) => user.toObject({ getters: true })) });
  } catch (error) {
    return next(
      new HttpError("Fetching users failed, please try again later.", 500)
    );
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });

    if (existingUser) {
      return next(new HttpError("User already exist", 422));
    }

    const createdUser = new UserModel({
      name,
      email,
      image: req.file?.path.toString().replace(/\\/g, "/"),
      password,
      places: [],
    });

    await createdUser.save();

    const token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET_MSG!,
      { expiresIn: expirationTimeInMs }
    );

    res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: expirationTimeInMs,
      })
      .json({ userId: createdUser.id, email: createdUser.email, token: token });
  } catch (error: any) {
    return next(new HttpError(`Signing up failed, please try again`, 500));
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 403)
      );
    }

    const isValidPassword = await existingUser.matchPassword(password);
    if (!isValidPassword) {
      return next(
        new HttpError("Invalid credentials, could not log you in.", 403)
      );
    }

    const token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_SECRET_MSG!,
      { expiresIn: expirationTimeInMs }
    );

    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: expirationTimeInMs,
      })
      .json({
        userId: existingUser.id,
        email: existingUser.email,
        token: token,
      });
  } catch (error: any) {
    return next(new HttpError(`Login failed, please try again`, 500));
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { maxAge: 0 })
    .json({ message: "Logged Out Successfully" });
};
