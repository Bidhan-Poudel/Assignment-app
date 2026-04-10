import { Router } from 'express';
import { getFavourites, addFavourite, removeFavourite } from '../controllers/favourites.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireAuth); // Protect all favourite routes

router.get('/', getFavourites);
router.post('/:propertyId', addFavourite);
router.delete('/:propertyId', removeFavourite);

export default router;
