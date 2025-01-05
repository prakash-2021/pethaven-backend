import Router from "koa-router";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizzes,
  getQuizById,
  updateQuiz,
} from "./quiz.controller";

const quizRouter = new Router({
  prefix: "/api/quiz",
});

// Define routes
quizRouter.post("/", createQuiz); // Create quiz
quizRouter.get("/", getAllQuizzes); // Get all quizzes
quizRouter.get("/:id", getQuizById); // Get quiz by ID
quizRouter.put("/:id", updateQuiz); // Update quiz
quizRouter.delete("/:id", deleteQuiz); // Delete quiz

export default quizRouter;
