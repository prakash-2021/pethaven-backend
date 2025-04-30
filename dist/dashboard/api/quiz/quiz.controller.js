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
exports.deleteQuizQuestion = exports.updateQuizQuestion = exports.getQuizQuestionById = exports.getAllQuizQuestions = exports.createQuizQuestion = void 0;
const quiz_service_1 = require("./quiz.service");
// Create a new quiz question
const createQuizQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionText } = ctx.request.body;
    if (!questionText || questionText.trim() === "") {
        ctx.throw(400, "Question text is required.");
    }
    const question = yield (0, quiz_service_1.createQuizQuestionService)({ questionText });
    ctx.status = 201;
    ctx.body = { message: "Quiz question created successfully", question };
});
exports.createQuizQuestion = createQuizQuestion;
// Get all quiz questions
const getAllQuizQuestions = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield (0, quiz_service_1.getAllQuizQuestionsService)();
    ctx.status = 200;
    ctx.body = questions;
});
exports.getAllQuizQuestions = getAllQuizQuestions;
// Get a single quiz question by ID
const getQuizQuestionById = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    if (!id)
        ctx.throw(400, "Question ID is required");
    const question = yield (0, quiz_service_1.getQuizQuestionByIdService)(id);
    if (!question)
        ctx.throw(404, "Quiz question not found");
    ctx.status = 200;
    ctx.body = question;
});
exports.getQuizQuestionById = getQuizQuestionById;
// Update a quiz question
const updateQuizQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    const { questionText } = ctx.request.body;
    if (!id)
        ctx.throw(400, "Question ID is required");
    if (!questionText || questionText.trim() === "") {
        ctx.throw(400, "Question text cannot be empty.");
    }
    const updatedQuestion = yield (0, quiz_service_1.updateQuizQuestionService)(id, {
        questionText,
    });
    ctx.status = 200;
    ctx.body = { message: "Quiz question updated successfully", updatedQuestion };
});
exports.updateQuizQuestion = updateQuizQuestion;
// Delete a quiz question
const deleteQuizQuestion = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = ctx.params;
    if (!id)
        ctx.throw(400, "Question ID is required");
    const deleted = yield (0, quiz_service_1.deleteQuizQuestionService)(id);
    ctx.status = 200;
    ctx.body = { message: "Quiz question deleted successfully" };
});
exports.deleteQuizQuestion = deleteQuizQuestion;
