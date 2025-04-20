import { db } from "../../../_shared/config/prisma";

interface ApplicationInput {
  userId: string;
  petId: string;
  reason: string;
  hasPetExperience: string;
  homeType: string;
  hasOtherPets: string;
}

export const createApplicationService = async (data: ApplicationInput) => {
  return await db.adoptionApplication.create({ data });
};

export const getAllApplicationsService = async () => {
  return await db.adoptionApplication.findMany({
    include: {
      user: true,
      pet: true,
    },
  });
};

export const updateApplicationStatusService = async (
  applicationId: string,
  status: string
) => {
  return await db.adoptionApplication.update({
    where: { applicationId },
    data: { status },
  });
};
