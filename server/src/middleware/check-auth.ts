import { Request, RequestHandler } from "express-serve-static-core";
import jwt from "jsonwebtoken";

import HttpError from "../models/http-error";

interface UserData {
  userId?: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      userData?: UserData;
    }
  }
}

const checkAuth: RequestHandler = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization?.split(" ")[1]; // Authorization: "Bearer TOKEN"
    const token = req.cookies.token;
    if (!token || !bearerToken) {
      throw new Error("Authentication failed");
    }
    const decodedBearerToken = jwt.verify(
      token,
      process.env.JWT_SECRET_MSG!
    ) as UserData;
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET_MSG!
    ) as UserData;
    if (!decodedBearerToken.userId !== !decodedToken.userId) {
      throw new Error("Authentication failed");
    }
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error: any) {
    return next(new HttpError("Authentication failed", 403));
  }
};

export default checkAuth;
