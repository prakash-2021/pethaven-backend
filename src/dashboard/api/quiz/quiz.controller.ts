import { Context } from "koa";
import prisma from "../../../_shared/config/prisma";

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

  try {
    const quiz: QuizResponse = await prisma.quiz.create({
      data: { title, description, options },
    });

    ctx.status = 201;
    ctx.body = { message: "Quiz created successfully", quiz };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Failed to create quiz", details: err };
  }
};

// Get all quizzes
export const getAllQuizzes = async (ctx: Context): Promise<void> => {
  try {
    const quizzes: QuizResponse[] = await prisma.quiz.findMany();
    ctx.status = 200;
    ctx.body = quizzes;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Failed to fetch quizzes", details: err };
  }
};

// Get a quiz by ID
export const getQuizById = async (ctx: Context): Promise<void> => {
  const { id } = ctx.params;

  try {
    const quiz: QuizResponse | null = await prisma.quiz.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!quiz) {
      ctx.status = 404;
      ctx.body = { error: "Quiz not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = quiz;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Failed to fetch quiz", details: err };
  }
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

  try {
    const updatedQuiz: QuizResponse = await prisma.quiz.update({
      where: { id: parseInt(id, 10) },
      data: { title, description, options },
    });

    ctx.status = 200;
    ctx.body = { message: "Quiz updated successfully", updatedQuiz };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Failed to update quiz", details: err };
  }
};

// Delete a quiz
export const deleteQuiz = async (ctx: Context): Promise<void> => {
  const { id } = ctx.params;

  try {
    await prisma.quiz.delete({
      where: { id: parseInt(id, 10) },
    });

    ctx.status = 200;
    ctx.body = { message: "Quiz deleted successfully" };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Failed to delete quiz", details: err };
  }
};
