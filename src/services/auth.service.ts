import prisma from "../config/db";
import bcrypt from "bcrypt";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new Error("User already exists");
  }

  const hashed = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: { email, password: hashed, name }
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) throw new Error("Invalid credentials");

  return user;
};