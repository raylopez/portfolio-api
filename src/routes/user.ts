import { Router } from "express";
import { UserController } from "../controllers/user.controller.ts";
import { validationMiddleware } from "../middlewares/validation.middleware.ts";
import { UserSchema } from "../models/schema.ts";

export const userRoutes: Router = Router()

userRoutes.get('/', UserController.getAll)
userRoutes.get('/:id', UserController.getById)
userRoutes.post('/', validationMiddleware(UserSchema), UserController.createUser)
userRoutes.patch('/:id', validationMiddleware(UserSchema), UserController.updateUser)