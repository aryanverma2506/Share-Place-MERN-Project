import { Request, Response, NextFunction } from "express-serve-static-core";

export default function cors(config?: { origin?: string[] }) {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (origin && config?.origin?.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  };
}

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
