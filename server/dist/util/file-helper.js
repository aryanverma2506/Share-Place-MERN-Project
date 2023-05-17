"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function deleteFile(filePath) {
    try {
        await promises_1.default.unlink(path_1.default.join(__dirname, `../../${filePath}`));
    }
    catch (error) {
        console.log(error);
    }
}
exports.deleteFile = deleteFile;
