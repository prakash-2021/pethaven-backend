import { ParameterizedContext } from "koa";
import { getPetsByAnswerIdsService } from "./answer.service";

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
