"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cors(config) {
    return (req, res, next) => {
        const origin = req.headers.origin;
        console.log(origin);
        if (origin && config?.origin?.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
        }
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }
        next();
    };
}
exports.default = cors;
// export default function cors(req: Request, res: Response, next: NextFunction) {
//   console.log(allowedOrigins);
//   const referer = req.headers.referer;
//   console.log(req.headers);
//   console.log(allowedOrigins.includes(referer!));
//   if (referer && allowedOrigins.includes(referer)) {
//     res.setHeader("Access-Control-Allow-Origin", referer);
//   }
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// }
