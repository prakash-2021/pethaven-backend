import { ParameterizedContext } from "koa";
import {
  createApplicationService,
  getAllApplicationsService,
  getApplicationsByUserIdService,
  updateApplicationStatusService,
} from "./application.service";

export const createApplication = async (
  ctx: ParameterizedContext<any, any>
) => {
  const data = ctx.request.body;
  const application = await createApplicationService(data);
  ctx.body = application;
};

export const getApplicationsByUserId = async (
  ctx: ParameterizedContext<any, any>
) => {
  const { userId } = ctx.params;

  if (!userId) {
    ctx.status = 400;
    ctx.body = { error: "User ID is required" };
    return;
  }

  const applications = await getApplicationsByUserIdService(userId);
  ctx.body = applications;
};

export const getAllApplications = async (
  ctx: ParameterizedContext<any, any>
) => {
  const applications = await getAllApplicationsService();
  ctx.body = applications;
};

export const updateApplicationStatus = async (
  ctx: ParameterizedContext<any, any>
) => {
  const { applicationId } = ctx.params;
  const { status } = ctx.request.body;
  const updated = await updateApplicationStatusService(applicationId, status);
  ctx.body = updated;
};
