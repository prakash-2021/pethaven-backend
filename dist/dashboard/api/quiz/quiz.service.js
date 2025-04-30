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
exports.deleteQuizQuestionService = exports.updateQuizQuestionService = exports.getQuizQuestionByIdService = exports.getAllQuizQuestionsService = exports.createQuizQuestionService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
// Create a new quiz question
const createQuizQuestionService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizQuestion.create({ data });
});
exports.createQuizQuestionService = createQuizQuestionService;
// Get all quiz questions
const getAllQuizQuestionsService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizQuestion.findMany({ include: { answers: true } });
});
exports.getAllQuizQuestionsService = getAllQuizQuestionsService;
// Get a single quiz question by ID
const getQuizQuestionByIdService = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizQuestion.findUnique({
        where: { questionId },
        include: { answers: true },
    });
});
exports.getQuizQuestionByIdService = getQuizQuestionByIdService;
// Update a quiz question
const updateQuizQuestionService = (questionId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizQuestion.update({
        where: { questionId },
        data,
    });
});
exports.updateQuizQuestionService = updateQuizQuestionService;
// Delete a quiz question
const deleteQuizQuestionService = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.$transaction([
        prisma_1.db.quizAnswer.deleteMany({ where: { questionId } }),
        prisma_1.db.quizQuestion.delete({ where: { questionId } }),
    ]);
});
exports.deleteQuizQuestionService = deleteQuizQuestionService;
