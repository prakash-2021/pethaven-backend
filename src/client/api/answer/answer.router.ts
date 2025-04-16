import Router from "koa-router";
import { getPetsByAnswerIds } from "./answer.controller";

const quizAnswerRouter = new Router({
  prefix: "/api/quiz-answers",
});

quizAnswerRouter.post("/pets-by-answers", getPetsByAnswerIds);

export default quizAnswerRouter;
