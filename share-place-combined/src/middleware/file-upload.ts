import multer from "multer";
import { Request } from "express-validator/src/base";
import HttpError from "../models/http-error";

interface MimeTypeMap {
  [key: string]: string;
}

const MIME_TYPE_MAP: MimeTypeMap = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./shared/uploads/images");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `${new Date().toISOString().replace(/:/g, "_")}-${file.originalname}`
    );
  },
});

function fileFilter(
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) {
  const isValid = !!MIME_TYPE_MAP[file.mimetype];
  const error = isValid
    ? null
    : new HttpError(
        "Invalid file type!!! File must be one of them .png, .jpg, .jpeg.",
        403
      );
  if (error) {
    return callback(error);
  }
  callback(error, isValid);
}

const fileUpload = multer({
  limits: { fileSize: 5000000 },
  storage: storage,
  fileFilter: fileFilter,
});

export default fileUpload;
