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
exports.loginService = exports.signupService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../../../_shared/config/prisma");
const exceptions_1 = require("../../../_shared/exceptions");
const jwt_1 = __importDefault(require("../../../utils/jwt"));
const signupService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const existingUser = yield prisma_1.db.admin.findUnique({ where: { email } });
    if (existingUser) {
        throw new exceptions_1.UnauthenticatedError({ message: "User already exists" });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    yield prisma_1.db.admin.create({
        data: { email, password: hashedPassword },
    });
    return { message: "User created successfully" };
});
exports.signupService = signupService;
const loginService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield prisma_1.db.admin.findUnique({ where: { email } });
    if (!user) {
        throw new exceptions_1.NotFoundError({ message: "User not found" });
    }
    const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new exceptions_1.UnauthenticatedError({ message: "Invalid credentials" });
    }
    const token = jwt_1.default.generateToken({ userId: user.adminId });
    return { message: "Login successful", token };
});
exports.loginService = loginService;
