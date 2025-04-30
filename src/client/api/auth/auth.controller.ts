import { config } from "dotenv";
import { ParameterizedContext } from "koa";
import cloudinaryUpload from "../../../_shared/config/cloudinaryUpload";
import { db } from "../../../_shared/config/prisma";
import { responseGenerator } from "../../../_shared/config/responseGenerator";
import { AppError } from "../../../_shared/exceptions";
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

// Load env
config();

export const storeImage = async (ctx: ParameterizedContext<any, any>) => {
  const file = ctx.request.files?.[0];
  const { userId } = ctx.params;

  if (!file) throw new AppError("No image file uploaded", 400, true);

  if (!userId) throw new AppError("User not authenticated", 401, true);

  const { secure_url, created_at } = await cloudinaryUpload(
    file.buffer,
    (process.env.CLOUDINARY_FOLDER as string) + "/user"
  );

  // Update the user's image field
  const updatedUser = await db.user.update({
    where: { userId },
    data: {
      image: secure_url,
    },
  });

  ctx.status = 201;
  ctx.body = responseGenerator({
    message: "Image uploaded and user updated successfully.",
    imageUrl: secure_url,
    createdAt: created_at,
    user: updatedUser,
  });
};

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
