import { Router } from 'express';
import { getProperties } from '../controllers/property.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Protect property listings behind auth as per generic portal design
router.get('/', requireAuth, getProperties);

export default router;
