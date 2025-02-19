import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "your_jwt_secret";

interface Payload {
  userId: number;
}

export const generateToken = (payload: Payload): string => {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};

export default { generateToken };
