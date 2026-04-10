import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import favouriteRoutes from './routes/favourites.routes';
import propertyRoutes from './routes/property.routes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/me', userRoutes);
app.use('/api/favourites', favouriteRoutes);
app.use('/api/properties', propertyRoutes);

// Global Error Handler
app.use(errorMiddleware);

export default app;
