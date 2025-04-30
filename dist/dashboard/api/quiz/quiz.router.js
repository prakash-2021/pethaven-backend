"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const quiz_controller_1 = require("./quiz.controller");
const quizRouter = new koa_router_1.default({
    prefix: "/api/quiz",
});
// Define routes
quizRouter.post("/", quiz_controller_1.createQuizQuestion); // Create quiz
quizRouter.get("/", quiz_controller_1.getAllQuizQuestions); // Get all quizzes
quizRouter.get("/:id", quiz_controller_1.getQuizQuestionById); // Get quiz by ID
quizRouter.put("/:id", quiz_controller_1.updateQuizQuestion); // Update quiz
quizRouter.delete("/:id", quiz_controller_1.deleteQuizQuestion); // Delete quiz
exports.default = quizRouter;
