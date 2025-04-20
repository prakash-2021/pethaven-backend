import Router from "koa-router";
import { authenticate } from "../_middlewares/auth";
import {
  getProfileController,
  login,
  signup,
  verifyEmail,
} from "./auth.controller";

const userRouter = new Router({
  prefix: "/api/users", // Prefix for the user-related routes
});

// Define routes
userRouter.post("/login", login); // Get all users
userRouter.post("/signup", signup); // Get user by ID
userRouter.get("/verify-email", verifyEmail); // Get user by ID
userRouter.get("/me", authenticate, getProfileController);

export default userRouter;
