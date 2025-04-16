import Router from "koa-router";
import { getAllQuizQuestions } from "./quiz.controller";

const quizRouter = new Router({
  prefix: "/api/quiz",
});

// Define routes
quizRouter.get("/", getAllQuizQuestions); // Get all quizzes

export default quizRouter;
