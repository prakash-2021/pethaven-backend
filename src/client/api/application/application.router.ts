import Router from "koa-router";
import {
  createApplication,
  getAllApplications,
  getApplicationsByUserId,
  updateApplicationStatus,
} from "./application.controller";

const applicationRouter = new Router({ prefix: "/api/applications" });

applicationRouter.post("/", createApplication);
applicationRouter.get("/:userId", getApplicationsByUserId);
applicationRouter.get("/", getAllApplications);
applicationRouter.put("/:applicationId/status", updateApplicationStatus);

export default applicationRouter;
