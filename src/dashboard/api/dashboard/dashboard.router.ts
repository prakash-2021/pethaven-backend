import Router from "koa-router";
import { dashboardController } from "./dashboard.controller";

const dashboardRouter = new Router({
  prefix: "/api/dashboard",
});

// GET /dashboard/stats
dashboardRouter.get("/", dashboardController.getStats);

export default dashboardRouter;
