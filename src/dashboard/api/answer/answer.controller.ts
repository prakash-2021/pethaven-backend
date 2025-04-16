import { ParameterizedContext } from "koa";
import {
  attachPetToAnswerService,
  createQuizAnswerService,
  deleteQuizAnswerService,
  getAnswersByAnswerIdService,
  getPetsByAnswerIdsService,
  updateQuizAnswerService,
} from "./answer.service";

interface QuizAnswerRequest {
  questionId: string;
  answerText: string;
}

export const createQuizAnswer = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { questionId, answerText } = ctx.request.body as QuizAnswerRequest;

  if (!questionId || !answerText || answerText.trim() === "") {
    ctx.throw(400, "Both questionId and valid answerText are required.");
  }

  const answer = await createQuizAnswerService({ questionId, answerText });

  ctx.status = 201;
  ctx.body = { message: "Answer created successfully", answer };
};

export const getAnswersById = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { answerId } = ctx.params;

  if (!answerId) ctx.throw(400, "Answer ID is required");

  const answers = await getAnswersByAnswerIdService(answerId);

  ctx.status = 200;
  ctx.body = answers[0];
};

export const updateQuizAnswer = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { answerId } = ctx.params;
  const { answerText } = ctx.request.body;

  if (!answerId || !answerText || answerText.trim() === "") {
    ctx.throw(400, "Valid answerText is required");
  }

  const updatedAnswer = await updateQuizAnswerService(answerId, answerText);

  ctx.status = 200;
  ctx.body = { message: "Answer updated successfully", updatedAnswer };
};

export const deleteQuizAnswer = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { answerId } = ctx.params;

  if (!answerId) ctx.throw(400, "Answer ID is required");

  await deleteQuizAnswerService(answerId);

  ctx.status = 200;
  ctx.body = { message: "Answer deleted successfully" };
};

export const attachPetToAnswer = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { answerId } = ctx.params;
  const { petId } = ctx.request.body;

  if (!answerId || !petId || !Array.isArray(petId)) {
    ctx.throw(400, "answerId and petId[] are required");
  }

  const mappings = await attachPetToAnswerService({
    answerId,
    petIds: petId,
  });

  ctx.status = 201;
  ctx.body = {
    message: "Pets attached to answer successfully",
    mappings,
  };
};
export const getPetsByAnswerIds = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const { answerIds } = ctx.request.body;

  if (!Array.isArray(answerIds) || answerIds.length === 0) {
    ctx.throw(400, "answerIds must be a non-empty array");
  }

  const result = await getPetsByAnswerIdsService(answerIds);
  ctx.status = 200;
  ctx.body = result;
};
