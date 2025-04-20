import Router from "koa-router";
import {
  getAllApplications,
  updateApplicationStatus,
} from "./application.controller";

const applicationRouter = new Router({ prefix: "/api/applications" });

applicationRouter.get("/", getAllApplications);
applicationRouter.put("/:applicationId/status", updateApplicationStatus);

export default applicationRouter;
