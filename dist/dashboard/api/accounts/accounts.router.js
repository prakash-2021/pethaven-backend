"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const accounts_controller_1 = require("./accounts.controller");
const router = new koa_router_1.default({ prefix: "/api/accounts" });
router.post("/signup", accounts_controller_1.signup);
router.post("/login", accounts_controller_1.login);
exports.default = router;
