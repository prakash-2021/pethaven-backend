import Router from "koa-router";
import { upload } from "../../../_shared/middlewares";
import { authenticate } from "../_middlewares/auth";
import {
  getProfileController,
  login,
  signup,
  storeImage,
  verifyEmail,
} from "./auth.controller";

const userRouter = new Router({
  prefix: "/api/users", // Prefix for the user-related routes
});

// Define routes
userRouter.post("/upload/:userId", upload.array("image", 1), storeImage);
userRouter.post("/login", login); // Get all users
userRouter.post("/signup", signup); // Get user by ID
userRouter.get("/verify-email", verifyEmail); // Get user by ID
userRouter.get("/me", authenticate, getProfileController);

export default userRouter;
