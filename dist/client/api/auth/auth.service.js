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
exports.getProfileService = exports.verifyEmailService = exports.loginService = exports.signupService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = require("../../../_shared/config/prisma");
const exceptions_1 = require("../../../_shared/exceptions");
const generateVerificationToken_1 = require("../../../utils/generateVerificationToken");
const jwt_1 = __importDefault(require("../../../utils/jwt"));
const sendVerificationEmail_1 = require("../../../utils/sendVerificationEmail");
const signupService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, firstName, lastName, phoneNumber, dateOfBirth, }) {
    const existingUser = yield prisma_1.db.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new exceptions_1.UnauthenticatedError({ message: "User already exists" });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const verificationToken = (0, generateVerificationToken_1.generateVerificationToken)(); // Generate the verification token
    const user = yield prisma_1.db.user.create({
        data: {
            email,
            password: hashedPassword,
            firstName,
            lastName,
            phoneNumber,
            dateOfBirth: new Date(dateOfBirth),
            verificationToken, // Store the verification token in the database
            verified: false, // Initially set verified to false
        },
    });
    // Send the verification email
    yield (0, sendVerificationEmail_1.sendVerificationEmail)(email, verificationToken);
    const token = jwt_1.default.generateToken({ userId: user.userId });
    return {
        message: "User created successfully. Please check your email for verification.",
        user,
        token,
    };
});
exports.signupService = signupService;
const loginService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    const user = yield prisma_1.db.user.findUnique({ where: { email } });
    if (!user) {
        throw new exceptions_1.NotFoundError({ message: "User not found" });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new exceptions_1.UnauthenticatedError({ message: "Invalid credentials" });
    }
    const token = jwt_1.default.generateToken({ userId: user.userId });
    return {
        message: "Login successful",
        user,
        token,
    };
});
exports.loginService = loginService;
const verifyEmailService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.db.user.findFirst({
        where: { verificationToken: token },
    });
    if (!user) {
        throw new exceptions_1.NotFoundError({ message: "Invalid or expired token" });
    }
    yield prisma_1.db.user.update({
        where: { userId: user.userId },
        data: {
            verified: true,
            verificationToken: "",
        },
    });
    const userToken = jwt_1.default.generateToken({ userId: user.userId });
    return {
        message: "Email verified successfully",
        token: userToken,
    };
});
exports.verifyEmailService = verifyEmailService;
const getProfileService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.db.user.findUnique({
        where: { userId },
        select: {
            userId: true,
            email: true,
            firstName: true,
            lastName: true,
            phoneNumber: true,
            dateOfBirth: true,
            verified: true,
            image: true,
        },
    });
    if (!user) {
        throw new exceptions_1.NotFoundError({ message: "User not found" });
    }
    return user;
});
exports.getProfileService = getProfileService;
