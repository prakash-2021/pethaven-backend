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
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const exceptions_1 = require("../../../_shared/exceptions");
const SECRET = process.env.JWT_SECRET || "jwt_secret";
const authenticateToken = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = ctx.headers["authorization"];
    const token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (!token) {
        throw new exceptions_1.UnauthenticatedError({});
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET);
        ctx.state.user = decoded;
        yield next();
    }
    catch (err) {
        throw new exceptions_1.ForbiddenError({});
    }
});
exports.authenticateToken = authenticateToken;
