import { db } from "../../../_shared/config/prisma";
import { sendApplicationEmail } from "../../../utils/sendApplicationEmail";

export const getAllApplicationsService = async () => {
  return await db.adoptionApplication.findMany({
    include: {
      user: true,
      pet: true,
    },
    orderBy: {
      submittedAt: "desc",
    },
  });
};

export const updateApplicationStatusService = async (
  applicationId: string,
  email: string,
  petName: string,
  status: "ACCEPTED" | "REJECTED"
) => {
  sendApplicationEmail(email, petName, status);

  return await db.adoptionApplication.update({
    where: { applicationId },
    data: { status },
  });
};
