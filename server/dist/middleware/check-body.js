"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.longitude = exports.latitude = exports.address = exports.description = exports.title = exports.password = exports.email = exports.name = void 0;
const express_validator_1 = require("express-validator");
exports.name = (0, express_validator_1.body)("name").notEmpty();
exports.email = (0, express_validator_1.body)("email").normalizeEmail().isEmail();
exports.password = (0, express_validator_1.body)("password").notEmpty().isLength({ min: 8 });
exports.title = (0, express_validator_1.body)("title").not().isEmpty();
exports.description = (0, express_validator_1.body)("description")
    .not()
    .isEmpty()
    .isLength({ min: 5 });
exports.address = (0, express_validator_1.body)("address").not().isEmpty();
exports.latitude = (0, express_validator_1.body)("latitude")
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
exports.longitude = (0, express_validator_1.body)("longitude")
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
