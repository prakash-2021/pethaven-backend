import Router from "koa-router";
import { login, signup } from "./accounts.controller";

const router = new Router({ prefix: "/api/accounts" });

router.post("/signup", signup);
router.post("/login", login);

export default router;
