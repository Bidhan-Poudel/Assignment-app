import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getAll,
  add,
  remove
} from "../controllers/favourites.controller";

const router = Router();

router.get("/", authMiddleware, getAll);
router.post("/", authMiddleware, add);
router.delete("/:id", authMiddleware, remove);

export default router;