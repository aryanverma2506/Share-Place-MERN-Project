import { Router } from "express";

import * as usersControllers from "../controllers/users-controllers";
import fileUpload from "../middleware/file-upload";
import * as checkBody from "../middleware/check-body";

const router = Router();

router.route("/").get(usersControllers.getUsers);

router
  .route("/signup")
  .post(
    fileUpload.single("image"),
    [checkBody.name, checkBody.email, checkBody.password],
    usersControllers.signup
  );

router.route("/login").post(usersControllers.login);

router.route("/logout").get(usersControllers.logout);

export default router;
