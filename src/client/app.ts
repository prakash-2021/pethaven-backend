import cors from "@koa/cors";
import { createServer } from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import {
  errorHandler,
  notFoundHandler,
} from "../_shared/middlewares/errorHandler";
import { initSocketIO } from "../utils/Webserver";
import quizAnswerRouter from "./api/answer/answer.router";
import applicationRouter from "./api/application/application.router";
import userRouter from "./api/auth/auth.router";
import chatRouter from "./api/message/message.router";
import petRouter from "./api/pet/pet.router";
import quizRouter from "./api/quiz/quiz.router";
import storyRouter from "./api/story/story.router";

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    // set default status and message
    ctx.status = 500;
    ctx.body = { message: "Unknown error" };

    ctx.app.emit("error", err, ctx);
  }
});

// Middlewares
app.use(bodyParser());
app.use(cors());

// Routes
app.use(petRouter.routes());
app.use(petRouter.allowedMethods());

app.use(quizAnswerRouter.routes());
app.use(quizAnswerRouter.allowedMethods());

app.use(quizRouter.routes());
app.use(quizRouter.allowedMethods());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.use(applicationRouter.routes());
app.use(applicationRouter.allowedMethods());

app.use(storyRouter.routes());
app.use(storyRouter.allowedMethods());

app.use(chatRouter.routes());
app.use(chatRouter.allowedMethods());

app.use(notFoundHandler);

const server = createServer((req, res) => {
  res.writeHead(200);
  res.end("Socket.IO server running");
});

initSocketIO(server);

app.on("error", (err, ctx) => {
  errorHandler(ctx, err);
});

export default app;
