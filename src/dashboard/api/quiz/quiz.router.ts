import Router from "koa-router";
import {
  createQuizQuestion,
  deleteQuizQuestion,
  getAllQuizQuestions,
  getQuizQuestionById,
  updateQuizQuestion,
} from "./quiz.controller";

const quizRouter = new Router({
  prefix: "/api/quiz",
});

// Define routes
quizRouter.post("/", createQuizQuestion); // Create quiz
quizRouter.get("/", getAllQuizQuestions); // Get all quizzes
quizRouter.get("/:id", getQuizQuestionById); // Get quiz by ID
quizRouter.put("/:id", updateQuizQuestion); // Update quiz
quizRouter.delete("/:id", deleteQuizQuestion); // Delete quiz

export default quizRouter;
