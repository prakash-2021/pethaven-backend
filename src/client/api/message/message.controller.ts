import { ParameterizedContext } from "koa";
import { getChatMessages } from "./message.service";

export const getMessagesWithAdmin = async (
  ctx: ParameterizedContext<any, any>
) => {
  const userId = ctx.state.user.userId;
  const adminId = ctx.params.adminId;
  ctx.body = await getChatMessages(userId, adminId, "user");
};
