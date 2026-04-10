import { Request, Response, NextFunction } from 'express';
import * as favouriteService from '../services/favourite.service';

export const getFavourites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id!;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await favouriteService.getFavourites(userId, page, limit);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addFavourite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id!;
    const propertyId = req.params.propertyId;
    
    const favourite = await favouriteService.addFavourite(userId, propertyId);
    res.status(201).json({ message: 'Added to favourites', favouriteId: favourite.id });
  } catch (error) {
    next(error);
  }
};

export const removeFavourite = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id!;
    const propertyId = req.params.propertyId;
    
    await favouriteService.removeFavourite(userId, propertyId);
    res.status(200).json({ message: 'Removed from favourites' });
  } catch (error) {
    next(error);
  }
};
