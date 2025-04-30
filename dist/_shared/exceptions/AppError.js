"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError extends Error {
    constructor(message, httpStatusCode, isOperational = false, details) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype); // ? done to ensure that the instance has the correct prototype chain
        this.httpStatusCode = httpStatusCode;
        this.isOperational = isOperational;
        if (details)
            this.details = details;
        Error.captureStackTrace(this); // ? capture stack trace of current instance
    }
}
exports.AppError = AppError;
