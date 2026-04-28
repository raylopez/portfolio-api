import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.ts";
import { UserController } from "../controllers/user.controller.ts";

export const userRoutes: Router = Router()

userRoutes.get('/', UserController.getAll)
userRoutes.get('/:id', UserController.getById)
userRoutes.post('/', userMiddleware, UserController.createUser)
userRoutes.put('/:id', userMiddleware, UserController.updateUser)