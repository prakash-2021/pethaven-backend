import jwt from "jsonwebtoken";
import { Context, Next } from "koa";
import {
  ForbiddenError,
  UnauthenticatedError,
} from "../../../_shared/exceptions";

const SECRET = process.env.JWT_SECRET || "jwt_secret";

interface JwtPayload {
  userId: number;
}

export const authenticateToken = async (
  ctx: Context,
  next: Next
): Promise<void> => {
  const authHeader = ctx.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    throw new UnauthenticatedError({});
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    throw new ForbiddenError({});
  }
};
