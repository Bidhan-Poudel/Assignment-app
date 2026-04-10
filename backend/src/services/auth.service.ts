import prisma from '../utils/prisma';
import { hashPassword, comparePassword } from '../utils/hash.util';
import { generateToken } from '../utils/jwt.util';

export const registerUser = async (data: any) => {
  const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
  if (existingUser) {
    throw { status: 400, message: 'Email already exists' };
  }

  const hashedPassword = await hashPassword(data.password);
  
  const user = await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      name: data.name
    }
  });

  const token = generateToken({ id: user.id, role: user.role });
  
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  };
};

export const loginUser = async (data: any) => {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const isMatch = await comparePassword(data.password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Invalid credentials' };
  }

  const token = generateToken({ id: user.id, role: user.role });
  
  return {
    token,
    user: { id: user.id, email: user.email, name: user.name, role: user.role }
  };
};
