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
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const accounts_service_1 = require("./accounts.service");
const signup = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    ctx.body = yield (0, accounts_service_1.signupService)({ email, password });
    ctx.status = 201;
});
exports.signup = signup;
const login = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = ctx.request.body;
    ctx.body = yield (0, accounts_service_1.loginService)({ email, password });
    ctx.status = 200;
});
exports.login = login;
