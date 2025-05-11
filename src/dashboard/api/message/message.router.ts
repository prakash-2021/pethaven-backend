import Router from "koa-router";
import { getMessagesWithUser } from "./message.controller";

const chatRouter = new Router({ prefix: "/admin/chat" });

chatRouter.get("/:userId", getMessagesWithUser);

export default chatRouter;
