import cors from "@koa/cors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import authRoutes from "./api/accounts/accounts.router";
import quizRouter from "./api/quiz/quiz.router";

const app = new Koa();

// Middlewares
app.use(bodyParser());
app.use(cors());
// app.use(errorHandler);

// Routes
app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

app.use(quizRouter.routes());
app.use(quizRouter.allowedMethods());

export default app;
