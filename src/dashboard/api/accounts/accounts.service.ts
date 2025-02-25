import bcrypt from "bcrypt";
import { db } from "../../../_shared/config/prisma";
import {
  NotFoundError,
  UnauthenticatedError,
} from "../../../_shared/exceptions";
import jwt from "../../../utils/jwt";

interface AuthRequestBody {
  email: string;
  password: string;
}

export const signupService = async ({ email, password }: AuthRequestBody) => {
  const existingUser = await db.admin.findUnique({ where: { email } });
  if (existingUser) {
    throw new UnauthenticatedError({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.admin.create({
    data: { email, password: hashedPassword },
  });

  return { message: "User created successfully" };
};

export const loginService = async ({ email, password }: AuthRequestBody) => {
  const user = await db.admin.findUnique({ where: { email } });
  if (!user) {
    throw new NotFoundError({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError({ message: "Invalid credentials" });
  }

  const token = jwt.generateToken({ userId: user.adminId });
  return { message: "Login successful", token };
};
