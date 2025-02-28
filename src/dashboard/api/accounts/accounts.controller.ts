import { ParameterizedContext } from "koa";
import { loginService, signupService } from "./accounts.service";

interface AuthRequestBody {
  email: string;
  password: string;
}

export const signup = async (ctx: ParameterizedContext<any, any>) => {
  const { email, password } = ctx.request.body as AuthRequestBody;
  ctx.body = await signupService({ email, password });
  ctx.status = 201;
};

export const login = async (ctx: ParameterizedContext<any, any>) => {
  const { email, password } = ctx.request.body as AuthRequestBody;
  ctx.body = await loginService({ email, password });
  ctx.status = 200;
};
