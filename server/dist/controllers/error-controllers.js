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
exports.errorOccurred = exports.routeNotFound = void 0;
const http_error_1 = __importDefault(require("../models/http-error"));
const fileHelper = __importStar(require("../util/file-helper"));
const routeNotFound = (req, res, next) => {
    const error = new http_error_1.default("Could not find this route.", 404);
    next(error);
};
exports.routeNotFound = routeNotFound;
const errorOccurred = async (error, req, res, next) => {
    if (req.file) {
        try {
            await fileHelper.deleteFile(req.file.path);
        }
        catch (error) {
            console.log(error);
        }
    }
    if (res.headersSent) {
        return next(error);
    }
    return res
        .status(error.code || 500)
        .json({ message: error.message || "An unknown error occurred!" });
};
exports.errorOccurred = errorOccurred;
