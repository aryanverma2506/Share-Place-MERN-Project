"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = __importDefault(require("../models/http-error"));
const checkAuth = (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization?.split(" ")[1]; // Authorization: "Bearer TOKEN"
        const token = req.cookies.token;
        if (!token || !bearerToken) {
            throw new Error("Authentication failed");
        }
        const decodedBearerToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_MSG);
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_MSG);
        if (!decodedBearerToken.userId !== !decodedToken.userId) {
            throw new Error("Authentication failed");
        }
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (error) {
        return next(new http_error_1.default("Authentication failed", 403));
    }
};
exports.default = checkAuth;
