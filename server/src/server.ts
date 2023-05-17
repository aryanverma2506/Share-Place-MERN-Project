import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import mongooseConnect from "./config/database";
import placesRoutes from "./routes/places-routes";
import usersRoutes from "./routes/users-routes";
// import cors from "./config/cors";
import * as errorControllers from "./controllers/error-controllers";

const app = express();
const allowedOrigins = process.env.CLIENT_URLS?.split(",").map((url) =>
  url.trim()
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// app.use(cors({ origin: allowedOrigins }));

app.use(
  "/shared/uploads",
  express.static(path.join(__dirname, "../shared/uploads"))
);

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use("*", errorControllers.routeNotFound);
app.use(errorControllers.errorOccurred);

mongooseConnect()
  .then(() => {
    return app.listen(process.env.PORT || 8080, () =>
      console.log(`Server started on PORT: ${process.env.PORT || 8080}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
