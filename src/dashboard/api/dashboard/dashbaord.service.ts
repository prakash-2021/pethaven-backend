import { subDays, subMonths } from "date-fns";
import { db } from "../../../_shared/config/prisma";

export const getDashboardStats = async () => {
  const now = new Date();
  const oneWeekAgo = subDays(now, 7);
  const oneMonthAgo = subMonths(now, 1);

  const totalUsers = await db.user.count();
  const totalPets = await db.pet.count();
  const totalAdoptedPets = await db.pet.count({
    where: {
      adoptionStatus: "ADOPTED",
    },
  });
  const totalStories = await db.story.count();
  const totalStrayDogReports = await db.strayDogReport.count();

  // Weekly & Monthly adopted pets
  const weeklyAdoptedPets = await db.pet.count({
    where: {
      adoptionStatus: "ADOPTED",
      addedAt: {
        gte: oneWeekAgo,
      },
    },
  });

  const monthlyAdoptedPets = await db.pet.count({
    where: {
      adoptionStatus: "ADOPTED",
      addedAt: {
        gte: oneMonthAgo,
      },
    },
  });

  // Weekly & Monthly stray dog reports
  const weeklyStrayDogReports = await db.strayDogReport.count({
    where: {
      reportDate: {
        gte: oneWeekAgo,
      },
    },
  });

  const monthlyStrayDogReports = await db.strayDogReport.count({
    where: {
      reportDate: {
        gte: oneMonthAgo,
      },
    },
  });

  return {
    totalUsers,
    totalPets,
    totalAdoptedPets,
    totalStories,
    totalStrayDogReports,
    weeklyAdoptedPets,
    monthlyAdoptedPets,
    weeklyStrayDogReports,
    monthlyStrayDogReports,
  };
};
