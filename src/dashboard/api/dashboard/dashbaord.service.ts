import { db } from "../../../_shared/config/prisma";

export const getDashboardStats = async () => {
  const totalUsers = await db.user.count();
  const totalPets = await db.pet.count();
  const totalAdoptedPets = await db.pet.count({
    where: {
      adoptionStatus: "ADOPTED",
    },
  });
  const totalStories = await db.story.count();
  const totalStrayDogReports = await db.strayDogReport.count();

  return {
    totalUsers,
    totalPets,
    totalAdoptedPets,
    totalStories,
    totalStrayDogReports,
  };
};
