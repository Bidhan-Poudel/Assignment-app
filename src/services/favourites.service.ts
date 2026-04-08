import prisma from "../config/db";

export const getFavourites = async (userId: number) => {
  return prisma.favourite.findMany({ where: { userId } });
};

export const addFavourite = async (
  userId: number,
  propertyId: string
) => {
  return prisma.favourite.create({
    data: { userId, propertyId }
  });
};

export const removeFavourite = async (
  userId: number,
  favId: number
) => {
  const fav = await prisma.favourite.findUnique({
    where: { id: favId }
  });

  if (!fav || fav.userId !== userId) {
    throw new Error("Unauthorized");
  }

  return prisma.favourite.delete({ where: { id: favId } });
};