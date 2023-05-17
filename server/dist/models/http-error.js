"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    code;
    constructor(message, errorCode) {
        super(message);
        this.code = errorCode;
    }
}
exports.default = HttpError;
