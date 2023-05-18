"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = __importDefault(require("../models/http-error"));
const user_model_1 = __importDefault(require("../models/user-model"));
const expirationTimeInMs = 1000 * 60 * 60;
const getUsers = async (req, res, next) => {
    try {
        const users = await user_model_1.default.find({}, "-password");
        res
            .status(200)
            .json({ users: users.map((user) => user.toObject({ getters: true })) });
    }
    catch (error) {
        return next(new http_error_1.default("Fetching users failed, please try again later.", 500));
    }
};
exports.getUsers = getUsers;
const signup = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new http_error_1.default("Invalid inputs passed, please check your data.", 422));
    }
    const { name, email, password } = req.body;
    try {
        const existingUser = await user_model_1.default.findOne({ email: email });
        if (existingUser) {
            return next(new http_error_1.default("User already exist", 422));
        }
        const createdUser = new user_model_1.default({
            name,
            email,
            image: req.file?.path.toString().replace(/\\/g, "/"),
            password,
            places: [],
        });
        await createdUser.save();
        const token = jsonwebtoken_1.default.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_SECRET_MSG, { expiresIn: expirationTimeInMs });
        res
            .status(201)
            .cookie("token", token, {
            httpOnly: true,
            maxAge: expirationTimeInMs,
            sameSite: "none",
            secure: true,
        })
            .json({ userId: createdUser.id, email: createdUser.email, token: token });
    }
    catch (error) {
        return next(new http_error_1.default(`Signing up failed, please try again`, 500));
    }
};
exports.signup = signup;
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await user_model_1.default.findOne({ email: email });
        if (!existingUser) {
            return next(new http_error_1.default("Invalid credentials, could not log you in.", 403));
        }
        const isValidPassword = await existingUser.matchPassword(password);
        if (!isValidPassword) {
            return next(new http_error_1.default("Invalid credentials, could not log you in.", 403));
        }
        const token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET_MSG, { expiresIn: expirationTimeInMs });
        return res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            maxAge: expirationTimeInMs,
            sameSite: "none",
            secure: true,
        })
            .json({
            userId: existingUser.id,
            email: existingUser.email,
            token: token,
        });
    }
    catch (error) {
        return next(new http_error_1.default(`Login failed, please try again`, 500));
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
        httpOnly: true,
        maxAge: 0,
        sameSite: "none",
        secure: true,
    })
        .json({ message: "Logged Out Successfully" });
};
exports.logout = logout;
