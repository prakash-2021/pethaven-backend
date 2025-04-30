"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const application_controller_1 = require("./application.controller");
const applicationRouter = new koa_router_1.default({ prefix: "/api/applications" });
applicationRouter.get("/", application_controller_1.getAllApplications);
applicationRouter.put("/:applicationId/status", application_controller_1.updateApplicationStatus);
exports.default = applicationRouter;
