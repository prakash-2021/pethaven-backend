import { Context } from "koa";
import {
  createQuizQuestionService,
  deleteQuizQuestionService,
  getAllQuizQuestionsService,
  getQuizQuestionByIdService,
  updateQuizQuestionService,
} from "./quiz.service";

interface QuizQuestionService {
  questionText: string;
}

// Create a new quiz question
export const createQuizQuestion = async (ctx: Context): Promise<void> => {
  const { questionText } = ctx.request.body as QuizQuestionService;

  if (!questionText || questionText.trim() === "") {
    ctx.throw(400, "Question text is required.");
  }

  const question = await createQuizQuestionService({ questionText });

  ctx.status = 201;
  ctx.body = { message: "Quiz question created successfully", question };
};

// Get all quiz questions
export const getAllQuizQuestions = async (ctx: Context): Promise<void> => {
  const questions = await getAllQuizQuestionsService();
  ctx.status = 200;
  ctx.body = questions;
};

// Get a single quiz question by ID
export const getQuizQuestionById = async (ctx: Context): Promise<void> => {
  const { questionId } = ctx.params;

  if (!questionId) ctx.throw(400, "Question ID is required");

  const question = await getQuizQuestionByIdService(questionId);

  if (!question) ctx.throw(404, "Quiz question not found");

  ctx.status = 200;
  ctx.body = question;
};

// Update a quiz question
export const updateQuizQuestion = async (ctx: Context): Promise<void> => {
  const { questionId } = ctx.params;
  const { questionText } = ctx.request.body as QuizQuestionService;

  if (!questionId) ctx.throw(400, "Question ID is required");
  if (!questionText || questionText.trim() === "") {
    ctx.throw(400, "Question text cannot be empty.");
  }

  const updatedQuestion = await updateQuizQuestionService(questionId, {
    questionText,
  });

  ctx.status = 200;
  ctx.body = { message: "Quiz question updated successfully", updatedQuestion };
};

// Delete a quiz question
export const deleteQuizQuestion = async (ctx: Context): Promise<void> => {
  const { questionId } = ctx.params;

  if (!questionId) ctx.throw(400, "Question ID is required");

  const deleted = await deleteQuizQuestionService(questionId);

  ctx.status = 200;
  ctx.body = { message: "Quiz question deleted successfully" };
};
