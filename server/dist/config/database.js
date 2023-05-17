"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
async function mongooseConnect() {
    try {
        const conn = await mongoose_1.default.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected ${conn.connection.name}`);
    }
    catch (error) {
        console.log(error);
    }
}
exports.default = mongooseConnect;
