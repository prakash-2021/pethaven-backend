import Router from "koa-router";
import {
  attachPetToAnswer,
  createQuizAnswer,
  deleteQuizAnswer,
  getAnswersById,
  getPetsByAnswerIds,
  updateQuizAnswer,
} from "./answer.controller";

const quizAnswerRouter = new Router({
  prefix: "/api/quiz-answers",
});

quizAnswerRouter.post("/", createQuizAnswer); // Create answer
quizAnswerRouter.get("/:answerId", getAnswersById); // Get answers by question
quizAnswerRouter.put("/:answerId", updateQuizAnswer); // Update answer
quizAnswerRouter.delete("/:answerId", deleteQuizAnswer); // Delete answer
quizAnswerRouter.post("/:answerId/attach-pet", attachPetToAnswer);
quizAnswerRouter.post("/pets-by-answers", getPetsByAnswerIds);

export default quizAnswerRouter;
