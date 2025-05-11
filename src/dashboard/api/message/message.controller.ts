import { ParameterizedContext } from "koa";
import { getChatMessages } from "../../../client/api/message/message.service";

export const getMessagesWithUser = async (
  ctx: ParameterizedContext<any, any>
) => {
  const adminId = ctx.state.admin.adminId;
  const userId = ctx.params.userId;
  ctx.body = await getChatMessages(adminId, userId, "admin");
};
