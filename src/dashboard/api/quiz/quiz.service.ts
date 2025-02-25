import { db } from "../../../_shared/config/prisma";

// Types for request and response
interface QuizQuestionRequestBody {
  questionText: string;
}

interface QuizQuestionResponse {
  questionId: string;
  questionText: string;
  createdAt: Date;
}

// Create a new quiz question
export const createQuizQuestionService = async (
  data: QuizQuestionRequestBody
) => {
  return await db.quizQuestion.create({ data });
};

// Get all quiz questions
export const getAllQuizQuestionsService = async (): Promise<
  QuizQuestionResponse[]
> => {
  return await db.quizQuestion.findMany({ include: { answers: true } });
};

// Get a single quiz question by ID
export const getQuizQuestionByIdService = async (questionId: string) => {
  return await db.quizQuestion.findUnique({
    where: { questionId },
    include: { answers: true },
  });
};

// Update a quiz question
export const updateQuizQuestionService = async (
  questionId: string,
  data: QuizQuestionRequestBody
) => {
  return await db.quizQuestion.update({
    where: { questionId },
    data,
  });
};

// Delete a quiz question
export const deleteQuizQuestionService = async (questionId: string) => {
  return await db.$transaction([
    db.quizAnswer.deleteMany({ where: { questionId } }),
    db.quizQuestion.delete({ where: { questionId } }),
  ]);
};
