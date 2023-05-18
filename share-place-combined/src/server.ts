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
import * as errorControllers from "./controllers/error-controllers";

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
  "/shared/uploads",
  express.static(path.join(__dirname, "../shared/uploads"))
);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(errorControllers.errorOccurred);

mongooseConnect()
  .then(() => {
    return app.listen(process.env.PORT || 3000, () =>
      console.log(`Server started on PORT: ${process.env.PORT || 3000}`)
    );
  })
  .catch((error) => {
    console.log(error);
  });
