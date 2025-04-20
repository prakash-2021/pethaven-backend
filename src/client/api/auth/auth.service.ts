import bcrypt from "bcrypt";
import { db } from "../../../_shared/config/prisma";
import {
  NotFoundError,
  UnauthenticatedError,
} from "../../../_shared/exceptions";
import { generateVerificationToken } from "../../../utils/generateVerificationToken";
import jwt from "../../../utils/jwt";
import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";

interface AuthRequestBody {
  email: string;
  password: string;
}

interface SignUpRequestBody extends AuthRequestBody {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: string; // or Date if already parsed
}

export const signupService = async ({
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  dateOfBirth,
}: SignUpRequestBody) => {
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new UnauthenticatedError({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const verificationToken = generateVerificationToken(); // Generate the verification token

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth: new Date(dateOfBirth),
      verificationToken, // Store the verification token in the database
      verified: false, // Initially set verified to false
    },
  });

  // Send the verification email
  await sendVerificationEmail(email, verificationToken);

  const token = jwt.generateToken({ userId: user.userId });

  return {
    message:
      "User created successfully. Please check your email for verification.",
    user,
    token,
  };
};

export const loginService = async ({ email, password }: AuthRequestBody) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new NotFoundError({ message: "User not found" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new UnauthenticatedError({ message: "Invalid credentials" });
  }

  const token = jwt.generateToken({ userId: user.userId });

  return {
    message: "Login successful",
    user,
    token,
  };
};

export const verifyEmailService = async (token: string) => {
  const user = await db.user.findFirst({
    where: { verificationToken: token },
  });

  if (!user) {
    throw new NotFoundError({ message: "Invalid or expired token" });
  }

  await db.user.update({
    where: { userId: user.userId },
    data: {
      verified: true,
      verificationToken: "",
    },
  });

  const userToken = jwt.generateToken({ userId: user.userId });

  return {
    message: "Email verified successfully",
    token: userToken,
  };
};

export const getProfileService = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { userId },
    select: {
      userId: true,
      email: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      dateOfBirth: true,
      verified: true,
    },
  });

  if (!user) {
    throw new NotFoundError({ message: "User not found" });
  }

  return user;
};
