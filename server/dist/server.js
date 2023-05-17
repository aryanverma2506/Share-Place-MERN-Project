"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const places_routes_1 = __importDefault(require("./routes/places-routes"));
const users_routes_1 = __importDefault(require("./routes/users-routes"));
const cors_1 = __importDefault(require("./config/cors"));
const errorControllers = __importStar(require("./controllers/error-controllers"));
const app = (0, express_1.default)();
const allowedOrigins = process.env.CLIENT_URLS?.split(",").map((url) => url.trim()) || [];
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({ origin: allowedOrigins }));
app.use("/shared/uploads", express_1.default.static(path_1.default.join(__dirname, "../shared/uploads")));
app.use("/api/places", places_routes_1.default);
app.use("/api/users", users_routes_1.default);
app.use("*", errorControllers.routeNotFound);
app.use(errorControllers.errorOccurred);
(0, database_1.default)()
    .then(() => {
    return app.listen(process.env.PORT || 8080, () => console.log(`Server started on PORT: ${process.env.PORT || 8080}`));
})
    .catch((error) => {
    console.log(error);
});
