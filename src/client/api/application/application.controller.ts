import { ParameterizedContext } from "koa";
import {
  createApplicationService,
  getAllApplicationsService,
  updateApplicationStatusService,
} from "./application.service";

export const createApplication = async (
  ctx: ParameterizedContext<any, any>
) => {
  const data = ctx.request.body;
  const application = await createApplicationService(data);
  ctx.body = application;
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
