import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { validateRoute } from '../middlewares/validate.middleware';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

const router = Router();

router.post('/register', validateRoute(registerSchema as any), register);
router.post('/login', validateRoute(loginSchema as any), login);

export default router;
