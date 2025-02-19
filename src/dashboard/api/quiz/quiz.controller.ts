import { Context } from "koa";
import { db } from "../../../_shared/config/prisma";

// Types for request and response
interface QuizRequestBody {
  title: string;
  description?: string | null;
  options: string[];
}

interface QuizResponse {
  id: number;
  title: string;
  description?: string | null;
  options: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Create a new quiz
export const createQuiz = async (ctx: Context): Promise<void> => {
  const { title, description, options } = ctx.request.body as QuizRequestBody;

  // Validate options
  if (!options || !Array.isArray(options) || options.length === 0) {
    ctx.status = 400;
    ctx.body = { error: "Options must be a non-empty array" };
    return;
  }

  const quiz: QuizResponse = await db.quiz.create({
    data: { title, description, options },
  });

  ctx.status = 201;
  ctx.body = { message: "Quiz created successfully", quiz };
};

// Get all quizzes
export const getAllQuizzes = async (ctx: Context): Promise<void> => {
  const quizzes: QuizResponse[] = await db.quiz.findMany();
  ctx.status = 200;
  ctx.body = quizzes;
};

// Get a quiz by ID
export const getQuizById = async (ctx: Context): Promise<void> => {
  const { id } = ctx.params;

  const quiz: QuizResponse | null = await db.quiz.findUnique({
    where: { id: parseInt(id, 10) },
  });

  if (!quiz) {
    ctx.status = 404;
    ctx.body = { error: "Quiz not found" };
    return;
  }

  ctx.status = 200;
  ctx.body = quiz;
};

// Update a quiz
export const updateQuiz = async (ctx: Context): Promise<void> => {
  const { id } = ctx.params;
  const { title, description, options } = ctx.request.body as QuizRequestBody;

  // Validate options if provided
  if (options && (!Array.isArray(options) || options.length === 0)) {
    ctx.status = 400;
    ctx.body = { error: "Options must be a non-empty array" };
    return;
  }

  const updatedQuiz: QuizResponse = await db.quiz.update({
    where: { id: parseInt(id, 10) },
    data: { title, description, options },
  });

  ctx.status = 200;
  ctx.body = { message: "Quiz updated successfully", updatedQuiz };
};

// Delete a quiz
export const deleteQuiz = async (ctx: Context): Promise<void> => {
  const { id } = ctx.params;

  await db.quiz.delete({
    where: { id: parseInt(id, 10) },
  });

  ctx.status = 200;
  ctx.body = { message: "Quiz deleted successfully" };
};
