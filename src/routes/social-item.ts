import { Router } from "express";
import { SocialItemController } from "../controllers/social-item.controller.ts";
import { validationMiddleware } from "../middlewares/candidate.middleware.ts";
import { SocialItemSchema } from "../models/schema.ts";

export const router = Router()
router.post('/', validationMiddleware(SocialItemSchema), SocialItemController.create)
router.patch('/:id', validationMiddleware(SocialItemSchema),SocialItemController.update)