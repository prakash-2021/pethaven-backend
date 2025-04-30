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
exports.getPetsByAnswerIds = exports.attachPetToAnswer = exports.deleteQuizAnswer = exports.updateQuizAnswer = exports.getAnswersById = exports.createQuizAnswer = void 0;
const answer_service_1 = require("./answer.service");
const createQuizAnswer = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionId, answerText } = ctx.request.body;
    if (!questionId || !answerText || answerText.trim() === "") {
        ctx.throw(400, "Both questionId and valid answerText are required.");
    }
    const answer = yield (0, answer_service_1.createQuizAnswerService)({ questionId, answerText });
    ctx.status = 201;
    ctx.body = { message: "Answer created successfully", answer };
});
exports.createQuizAnswer = createQuizAnswer;
const getAnswersById = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = ctx.params;
    if (!answerId)
        ctx.throw(400, "Answer ID is required");
    const answers = yield (0, answer_service_1.getAnswersByAnswerIdService)(answerId);
    ctx.status = 200;
    ctx.body = answers[0];
});
exports.getAnswersById = getAnswersById;
const updateQuizAnswer = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = ctx.params;
    const { answerText } = ctx.request.body;
    if (!answerId || !answerText || answerText.trim() === "") {
        ctx.throw(400, "Valid answerText is required");
    }
    const updatedAnswer = yield (0, answer_service_1.updateQuizAnswerService)(answerId, answerText);
    ctx.status = 200;
    ctx.body = { message: "Answer updated successfully", updatedAnswer };
});
exports.updateQuizAnswer = updateQuizAnswer;
const deleteQuizAnswer = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = ctx.params;
    if (!answerId)
        ctx.throw(400, "Answer ID is required");
    yield (0, answer_service_1.deleteQuizAnswerService)(answerId);
    ctx.status = 200;
    ctx.body = { message: "Answer deleted successfully" };
});
exports.deleteQuizAnswer = deleteQuizAnswer;
const attachPetToAnswer = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerId } = ctx.params;
    const { petId } = ctx.request.body;
    if (!answerId || !petId || !Array.isArray(petId)) {
        ctx.throw(400, "answerId and petId[] are required");
    }
    const mappings = yield (0, answer_service_1.attachPetToAnswerService)({
        answerId,
        petIds: petId,
    });
    ctx.status = 201;
    ctx.body = {
        message: "Pets attached to answer successfully",
        mappings,
    };
});
exports.attachPetToAnswer = attachPetToAnswer;
const getPetsByAnswerIds = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { answerIds } = ctx.request.body;
    if (!Array.isArray(answerIds) || answerIds.length === 0) {
        ctx.throw(400, "answerIds must be a non-empty array");
    }
    const result = yield (0, answer_service_1.getPetsByAnswerIdsService)(answerIds);
    ctx.status = 200;
    ctx.body = result;
});
exports.getPetsByAnswerIds = getPetsByAnswerIds;
