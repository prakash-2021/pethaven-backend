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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const zod_1 = require("zod");
const exceptions_1 = require("../exceptions");
const notFoundHandler = (ctx) => {
    ctx.status = 404;
    ctx.body = { message: `Can't find endpoint ${ctx.req.url}` };
    return;
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (ctx, err) => __awaiter(void 0, void 0, void 0, function* () {
    if (err instanceof exceptions_1.AppError) {
        if (!err.isOperational) {
            // TODO: report to Sentry or setup alerts
            ctx.log.fatal(err);
            process.exit(1);
        }
        else {
            const { message, httpStatusCode, details } = err;
            ctx.status = httpStatusCode;
            ctx.body = { message, details };
        }
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        const { message } = err, rest = __rest(err, ["message"]);
        ctx.status = 401;
        ctx.body = { message, details: rest };
    }
    else if (err instanceof zod_1.ZodError) {
        ctx.status = 400;
        ctx.body = { message: "zod", details: err.issues };
    }
    else {
        // TODO: report to Sentry or setup alerts
        ctx.status = 500;
        ctx.body = { message: err.message };
    }
});
exports.errorHandler = errorHandler;
