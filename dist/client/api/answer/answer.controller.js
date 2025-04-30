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
exports.getPetsByAnswerIds = void 0;
const answer_service_1 = require("./answer.service");
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
