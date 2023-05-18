"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const http_error_1 = __importDefault(require("../models/http-error"));
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./shared/uploads/images");
    },
    filename: (req, file, callback) => {
        callback(null, `${new Date().toISOString().replace(/:/g, "_")}-${file.originalname}`);
    },
});
function fileFilter(req, file, callback) {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid
        ? null
        : new http_error_1.default("Invalid file type!!! File must be one of them .png, .jpg, .jpeg.", 403);
    if (error) {
        return callback(error);
    }
    callback(error, isValid);
}
const fileUpload = (0, multer_1.default)({
    limits: { fileSize: 5000000 },
    storage: storage,
    fileFilter: fileFilter,
});
exports.default = fileUpload;
