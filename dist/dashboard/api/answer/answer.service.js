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
exports.getPetsByAnswerIdsService = exports.attachPetToAnswerService = exports.deleteQuizAnswerService = exports.updateQuizAnswerService = exports.getAnswersByAnswerIdService = exports.createQuizAnswerService = void 0;
const prisma_1 = require("../../../_shared/config/prisma");
const createQuizAnswerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizAnswer.create({ data });
});
exports.createQuizAnswerService = createQuizAnswerService;
const getAnswersByAnswerIdService = (answerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizAnswer.findMany({
        where: { answerId },
        include: { answerPetMappings: true },
    });
});
exports.getAnswersByAnswerIdService = getAnswersByAnswerIdService;
const updateQuizAnswerService = (answerId, answerText) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizAnswer.update({
        where: { answerId },
        data: { answerText },
    });
});
exports.updateQuizAnswerService = updateQuizAnswerService;
const deleteQuizAnswerService = (answerId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.db.quizAnswer.delete({ where: { answerId } });
});
exports.deleteQuizAnswerService = deleteQuizAnswerService;
const attachPetToAnswerService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ answerId, petIds, }) {
    const createdMappings = yield prisma_1.db.$transaction(petIds.map((petId) => prisma_1.db.answerPetMapping.create({
        data: {
            answerId,
            petId,
        },
    })));
    return createdMappings;
});
exports.attachPetToAnswerService = attachPetToAnswerService;
const getPetsByAnswerIdsService = (answerIds) => __awaiter(void 0, void 0, void 0, function* () {
    const mappings = yield prisma_1.db.answerPetMapping.findMany({
        where: {
            answerId: {
                in: answerIds,
            },
        },
        include: {
            pet: true, // this fetches full pet info
        },
    });
    // Group by answerId
    const grouped = {};
    for (const map of mappings) {
        if (!grouped[map.answerId]) {
            grouped[map.answerId] = [];
        }
        grouped[map.answerId].push(map.pet);
    }
    // Ensure all answerIds are represented even if no pets
    return answerIds.map((id) => ({
        answerId: id,
        pets: grouped[id] || [],
    }));
});
exports.getPetsByAnswerIdsService = getPetsByAnswerIdsService;
