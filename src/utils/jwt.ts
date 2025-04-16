import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "jwt-secret";

interface Payload {
  userId: string;
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

export default { generateToken };
