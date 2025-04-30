import { ParameterizedContext } from "koa";
import { responseGenerator } from "../../../_shared/config/responseGenerator";
import { getDashboardStats } from "./dashbaord.service";

export const dashboardController = {
  async getStats(ctx: ParameterizedContext<any, any>) {
    const stats = await getDashboardStats();

    ctx.body = responseGenerator({
      message: "Dashboard stats fetched successfully",
      data: stats,
    });
  },
};
