import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  email: string;
  role: string;
  name: string;
}

export const generateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h"
  });
};