import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_super_secret_key";

export const generateToken = (id: number): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1d",
  });
}; 