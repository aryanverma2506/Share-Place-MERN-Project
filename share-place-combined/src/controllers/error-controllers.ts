import { ErrorRequestHandler } from "express-serve-static-core";

import * as fileHelper from "../util/file-helper";

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
