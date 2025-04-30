"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileController = exports.verifyEmail = exports.login = exports.signup = exports.storeImage = void 0;
const dotenv_1 = require("dotenv");
const cloudinaryUpload_1 = __importDefault(require("../../../_shared/config/cloudinaryUpload"));
const prisma_1 = require("../../../_shared/config/prisma");
const responseGenerator_1 = require("../../../_shared/config/responseGenerator");
const exceptions_1 = require("../../../_shared/exceptions");
const auth_service_1 = require("./auth.service");
// Load env
(0, dotenv_1.config)();
const storeImage = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const file = (_a = ctx.request.files) === null || _a === void 0 ? void 0 : _a[0];
    const { userId } = ctx.params;
    if (!file)
        throw new exceptions_1.AppError("No image file uploaded", 400, true);
    if (!userId)
        throw new exceptions_1.AppError("User not authenticated", 401, true);
    const { secure_url, created_at } = yield (0, cloudinaryUpload_1.default)(file.buffer, process.env.CLOUDINARY_FOLDER + "/user");
    // Update the user's image field
    const updatedUser = yield prisma_1.db.user.update({
        where: { userId },
        data: {
            image: secure_url,
        },
    });
    ctx.status = 201;
    ctx.body = (0, responseGenerator_1.responseGenerator)({
        message: "Image uploaded and user updated successfully.",
        imageUrl: secure_url,
        createdAt: created_at,
        user: updatedUser,
    });
});
exports.storeImage = storeImage;
const signup = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, firstName, lastName, phoneNumber, dateOfBirth } = ctx
        .request.body;
    ctx.body = yield (0, auth_service_1.signupService)({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
    });
    ctx.status = 201;
});
exports.signup = signup;
const login = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    ctx.body = yield (0, auth_service_1.loginService)({ email, password });
    ctx.status = 200;
});
exports.login = login;
const verifyEmail = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = ctx.query;
    if (!token || typeof token !== "string") {
        ctx.status = 400;
        ctx.body = { error: "Invalid or missing token" };
        return;
    }
    ctx.body = yield (0, auth_service_1.verifyEmailService)(token);
    ctx.status = 200;
});
exports.verifyEmail = verifyEmail;
const getProfileController = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.state.user.userId;
    const user = yield (0, auth_service_1.getProfileService)(userId);
    ctx.body = { user };
});
exports.getProfileController = getProfileController;
