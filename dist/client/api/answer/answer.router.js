"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const answer_controller_1 = require("./answer.controller");
const quizAnswerRouter = new koa_router_1.default({
    prefix: "/api/quiz-answers",
});
quizAnswerRouter.post("/pets-by-answers", answer_controller_1.getPetsByAnswerIds);
exports.default = quizAnswerRouter;
