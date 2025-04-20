import { ParameterizedContext } from "koa";
import {
  getAllApplicationsService,
  updateApplicationStatusService,
} from "./application.service";

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
  const { status, petName, email } = ctx.request.body;
  const updated = await updateApplicationStatusService(
    applicationId,
    email,
    petName,
    status
  );
  ctx.body = updated;
};
