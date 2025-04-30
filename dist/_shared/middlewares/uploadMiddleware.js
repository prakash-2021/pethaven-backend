"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("@koa/multer"));
const path_1 = __importDefault(require("path"));
const exceptions_1 = require("../exceptions");
exports.upload = (0, multer_1.default)({
    fileFilter: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        if (ext !== ".jpg" &&
            ext !== ".jpe" &&
            ext !== ".jpeg" &&
            ext !== ".png" &&
            ext !== ".webp") {
            cb(new exceptions_1.AppError("Invalid image format", 415, true), false);
            return;
        }
        cb(null, true);
    },
    limits: { fileSize: 10000000 }, // * 10MB
});
exports.default = exports.upload;
