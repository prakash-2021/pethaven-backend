import { ParameterizedContext } from "koa";
import { getAllQuizQuestionsService } from "./quiz.service";

export const getAllQuizQuestions = async (
  ctx: ParameterizedContext<any, any>
): Promise<void> => {
  const questions = await getAllQuizQuestionsService();
  ctx.status = 200;
  ctx.body = questions;
};
