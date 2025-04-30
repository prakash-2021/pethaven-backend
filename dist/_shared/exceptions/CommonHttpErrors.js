"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayloadTooLargeError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthenticatedError = void 0;
const AppError_1 = require("./AppError");
class UnauthenticatedError extends AppError_1.AppError {
    constructor({ message = "Unauthenticated", details }) {
        super(message, 401, true, details);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class ForbiddenError extends AppError_1.AppError {
    constructor({ message = "Permission denied", details }) {
        super(message, 403, true, details);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError_1.AppError {
    constructor({ message = "Resource not found", details }) {
        super(message, 404, true, details);
    }
}
exports.NotFoundError = NotFoundError;
class PayloadTooLargeError extends AppError_1.AppError {
    constructor({ message = "Resource not found", details }) {
        super(message, 413, true, details);
    }
}
exports.PayloadTooLargeError = PayloadTooLargeError;
