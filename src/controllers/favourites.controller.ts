import { Request, Response } from "express";
import {
  getFavourites,
  addFavourite,
  removeFavourite
} from "../services/favourites.service";

export const getAll = async (req: Request, res: Response) => {
  const favs = await getFavourites(req.user!.userId);
  res.json(favs);
};

export const add = async (req: Request, res: Response) => {
  const { propertyId } = req.body;

  if (!propertyId) {
    return res.status(400).json({ message: "propertyId required" });
  }

  const fav = await addFavourite(req.user!.userId, propertyId);
  res.status(201).json(fav);
};

export const remove = async (req: Request, res: Response) => {
  try {
    await removeFavourite(
      req.user!.userId,
      Number(req.params.id)
    );

    res.json({ message: "Removed" });
  } catch (err: any) {
    res.status(403).json({ message: err.message });
  }
};