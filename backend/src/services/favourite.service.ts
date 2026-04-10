import prisma from '../utils/prisma';

export const getFavourites = async (userId: string, page: number = 1, limit: number = 10) => {
  const skip = (page - 1) * limit;

  const [favourites, total] = await Promise.all([
    prisma.favourite.findMany({
      where: { userId },
      include: {
        property: true
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    }),
    prisma.favourite.count({ where: { userId } })
  ]);

  return {
    data: favourites,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  };
};

export const addFavourite = async (userId: string, propertyId: string) => {
  // Verify property exists
  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) {
    throw { status: 404, message: 'Property not found' };
  }

  // Prevent duplicates natively via Prisma unique constraint or explicitly
  const existing = await prisma.favourite.findUnique({
    where: {
      userId_propertyId: {
        userId,
        propertyId
      }
    }
  });

  if (existing) {
    return existing; // Already favourited
  }

  return await prisma.favourite.create({
    data: {
      userId,
      propertyId
    }
  });
};

export const removeFavourite = async (userId: string, propertyId: string) => {
  try {
    await prisma.favourite.delete({
      where: {
        userId_propertyId: {
          userId,
          propertyId
        }
      }
    });
  } catch (error: any) {
    // If it doesn't exist, we don't necessarily need to throw an error
    if (error.code !== 'P2025') {
      throw error;
    }
  }
};
