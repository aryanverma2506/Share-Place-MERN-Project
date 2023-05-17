"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cors(allowedOrigins, req, res, next) {
    const origin = req.headers.origin;
    allowedOrigins.includes(origin) &&
        res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
}
exports.default = cors;
