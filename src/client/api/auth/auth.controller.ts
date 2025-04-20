import { ParameterizedContext } from "koa";
import {
  getProfileService,
  loginService,
  signupService,
  verifyEmailService,
} from "./auth.service";

interface LoginBody {
  email: string;
  password: string;
}

interface SignupBody extends LoginBody {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export const signup = async (ctx: ParameterizedContext<any, any>) => {
  const { email, password, firstName, lastName, phoneNumber, dateOfBirth } = ctx
    .request.body as SignupBody;

  ctx.body = await signupService({
    email,
    password,
    firstName,
    lastName,
    phoneNumber,
    dateOfBirth,
  });

  ctx.status = 201;
};

export const login = async (ctx: ParameterizedContext<any, any>) => {
  const { email, password } = ctx.request.body as LoginBody;

  ctx.body = await loginService({ email, password });
  ctx.status = 200;
};

export const verifyEmail = async (ctx: ParameterizedContext<any, any>) => {
  const { token } = ctx.query;

  if (!token || typeof token !== "string") {
    ctx.status = 400;
    ctx.body = { error: "Invalid or missing token" };
    return;
  }

  ctx.body = await verifyEmailService(token);
  ctx.status = 200;
};

export const getProfileController = async (
  ctx: ParameterizedContext<any, any>
) => {
  const userId = ctx.state.user.userId;

  const user = await getProfileService(userId);

  ctx.body = { user };
};
