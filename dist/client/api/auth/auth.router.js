"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const middlewares_1 = require("../../../_shared/middlewares");
const auth_1 = require("../_middlewares/auth");
const auth_controller_1 = require("./auth.controller");
const userRouter = new koa_router_1.default({
    prefix: "/api/users", // Prefix for the user-related routes
});
// Define routes
userRouter.post("/upload/:userId", middlewares_1.upload.array("image", 1), auth_controller_1.storeImage);
userRouter.post("/login", auth_controller_1.login); // Get all users
userRouter.post("/signup", auth_controller_1.signup); // Get user by ID
userRouter.get("/verify-email", auth_controller_1.verifyEmail); // Get user by ID
userRouter.get("/me", auth_1.authenticate, auth_controller_1.getProfileController);
exports.default = userRouter;
