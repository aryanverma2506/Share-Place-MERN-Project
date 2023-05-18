"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    image: {
        type: String,
        required: true,
    },
    places: [
        {
            type: mongoose_1.Types.ObjectId,
            required: true,
            ref: "Place",
        },
    ],
}, { timestamps: true });
userSchema.plugin(mongoose_unique_validator_1.default);
userSchema.pre("save", async function save(next) {
    if (this.isModified("password")) {
        const salt = await bcryptjs_1.default.genSalt(12); // 12 Salting Rounds
        this.password = await bcryptjs_1.default.hash(this.password, salt);
    }
    next();
});
userSchema.methods.matchPassword = async function (plainPassword) {
    return bcryptjs_1.default.compare(plainPassword, this.password);
};
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
