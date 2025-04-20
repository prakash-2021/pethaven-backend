import jwt from "jsonwebtoken";
import { Next, ParameterizedContext } from "koa";
import { UnauthenticatedError } from "../../../_shared/exceptions";
export const authenticate = async (ctx: ParameterizedContext, next: Next) => {
  const authHeader = ctx.headers.authorization;

  const SECRET = process.env.JWT_SECRET || "jwt_secret";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError({
      message: "Authorization header missing or malformed",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET); // should return { userId: ... }
    ctx.state.user = decoded;
    await next();
  } catch (err) {
    throw new UnauthenticatedError({ message: "Invalid or expired token" });
  }
};
