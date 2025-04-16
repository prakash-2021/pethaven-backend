import { db } from "../../../_shared/config/prisma";

interface QuizQuestionResponse {
  questionId: string;
  questionText: string;
  createdAt: Date;
}

// Get all quiz questions
export const getAllQuizQuestionsService = async (): Promise<
  QuizQuestionResponse[]
> => {
  return await db.quizQuestion.findMany({ include: { answers: true } });
};
