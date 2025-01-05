import bcrypt from "bcrypt";
import { Context } from "koa";
import prisma from "../../../_shared/config/prisma";
import {
  NotFoundError,
  UnauthenticatedError,
} from "../../../_shared/exceptions";
import jwt from "../../../utils/jwt";

interface AuthRequestBody {
  email: string;
  password: string;
}

export const signup = async (ctx: Context): Promise<void> => {
  const { email, password } = ctx.request.body as AuthRequestBody;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new UnauthenticatedError({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    ctx.status = 201;
    ctx.body = { message: "User created successfully" };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};

export const login = async (ctx: Context): Promise<void> => {
  const { email, password } = ctx.request.body as AuthRequestBody;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new NotFoundError({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthenticatedError({ message: "Invalid credentials" });
    }

    const token = jwt.generateToken({ userId: user.id });
    ctx.status = 200;
    ctx.body = { message: "Login successful", token };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Internal server error" };
  }
};
