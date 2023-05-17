import fs from "fs/promises";
import { RequestHandler, ErrorRequestHandler } from "express-serve-static-core";

import HttpError from "../models/http-error";
import * as fileHelper from "../util/file-helper";

export const routeNotFound: RequestHandler = (req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  next(error);
};

export const errorOccurred: ErrorRequestHandler = async (
  error,
  req,
  res,
  next
) => {
  if (req.file) {
    try {
      await fileHelper.deleteFile(req.file.path);
    } catch (error: any) {
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
