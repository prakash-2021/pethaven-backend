import { db } from "../../../_shared/config/prisma";

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
