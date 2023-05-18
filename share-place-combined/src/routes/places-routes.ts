import { Router } from "express";

import * as placesControllers from "../controllers/places-controllers";
import * as checkBody from "../middleware/check-body";
import fileUpload from "../middleware/file-upload";
import checkAuth from "../middleware/check-auth";

const router = Router();

router
  .route("/")
  .post(
    checkAuth,
    fileUpload.single("image"),
    [
      checkBody.title,
      checkBody.description,
      checkBody.address,
      checkBody.latitude,
      checkBody.longitude,
    ],
    placesControllers.createPlace
  );

router
  .route("/:placeId")
  .get(placesControllers.getPlaceById)
  .patch(
    checkAuth,
    [checkBody.title, checkBody.description],
    placesControllers.updatePlaceById
  )
  .delete(checkAuth, placesControllers.deletePlaceById);

router.route("/user/:uId").get(placesControllers.getPlacesByUserId);

export default router;
