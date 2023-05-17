import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

import mongooseConnect from "./config/database";
import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
import cors from "./config/cors";
import * as errorControllers from "./controllers/error-controllers";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  "/shared/uploads",
  express.static(path.join(__dirname, "../shared/uploads"))
);

app.use(cors);

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use("*", errorControllers.routeNotFound);
app.use(errorControllers.errorOccurred);

// For Development
// mongooseConnect()
//   .then(() => {
//     return app.listen(process.env.PORT || 8080, () =>
//       console.log(
//         `Server is listening on http://localhost:${process.env.PORT || 8080}/`
//       )
//     );
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// For Production
mongooseConnect()
  .then(() => {
    return app.listen(process.env.PORT || 8080);
  })
  .catch((error) => {
    console.log(error);
  });
