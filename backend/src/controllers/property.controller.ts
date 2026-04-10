import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prisma';

export const getProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};
