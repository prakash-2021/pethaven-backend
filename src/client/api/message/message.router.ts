import Router from "koa-router";
import { getMessagesWithAdmin } from "./message.controller";

const chatRouter = new Router({ prefix: "/user/chat" });

chatRouter.get("/:adminId", getMessagesWithAdmin);

export default chatRouter;
