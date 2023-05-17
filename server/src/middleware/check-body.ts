import { body } from "express-validator";

export const name = body("name").notEmpty();

export const email = body("email").normalizeEmail().isEmail();

export const password = body("password").notEmpty().isLength({ min: 8 });

export const title = body("title").not().isEmpty();

export const description = body("description")
  .not()
  .isEmpty()
  .isLength({ min: 5 });

export const address = body("address").not().isEmpty();

export const latitude = body("latitude")
  .exists()
  .withMessage("Latitude is required")
  .isFloat()
  .withMessage("Latitude must be a valid number")
  .custom((value, { req }) => {
    if (+value < -90 || +value > 90) {
      throw new Error("Latitude must be in the range of -90 to 90");
    }
    return true;
  });

export const longitude = body("longitude")
  .exists()
  .withMessage("Longitude is required")
  .isFloat()
  .withMessage("Longitude must be a valid number")
  .custom((value, { req }) => {
    if (+value < -180 || +value > 180) {
      throw new Error("Longitude must be in the range of -180 to 180");
    }
    return true;
  });
