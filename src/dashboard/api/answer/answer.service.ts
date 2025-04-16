import { db } from "../../../_shared/config/prisma";

interface QuizAnswerRequest {
  questionId: string;
  answerText: string;
}

interface AttachPetRequest {
  answerId: string;
  petId: string;
}

export const createQuizAnswerService = async (data: QuizAnswerRequest) => {
  return await db.quizAnswer.create({ data });
};

export const getAnswersByAnswerIdService = async (answerId: string) => {
  return await db.quizAnswer.findMany({
    where: { answerId },
    include: { answerPetMappings: true },
  });
};

export const updateQuizAnswerService = async (
  answerId: string,
  answerText: string
) => {
  return await db.quizAnswer.update({
    where: { answerId },
    data: { answerText },
  });
};

export const deleteQuizAnswerService = async (answerId: string) => {
  return await db.quizAnswer.delete({ where: { answerId } });
};

export const attachPetToAnswerService = async ({
  answerId,
  petIds,
}: {
  answerId: string;
  petIds: string[];
}) => {
  const createdMappings = await db.$transaction(
    petIds.map((petId) =>
      db.answerPetMapping.create({
        data: {
          answerId,
          petId,
        },
      })
    )
  );

  return createdMappings;
};

export const getPetsByAnswerIdsService = async (answerIds: string[]) => {
  const mappings = await db.answerPetMapping.findMany({
    where: {
      answerId: {
        in: answerIds,
      },
    },
    include: {
      pet: true, // this fetches full pet info
    },
  });

  // Group by answerId
  const grouped: Record<string, any[]> = {};

  for (const map of mappings) {
    if (!grouped[map.answerId]) {
      grouped[map.answerId] = [];
    }
    grouped[map.answerId].push(map.pet);
  }

  // Ensure all answerIds are represented even if no pets
  return answerIds.map((id) => ({
    answerId: id,
    pets: grouped[id] || [],
  }));
};
