import { User } from "../database/schema.ts";
import type { Response, Request } from "express";
import type { UserSchema, UserUpdateSchema } from "../models/schema.ts";

export class UserController {
  static getAll = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.json(users);
  };

  static getById = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const userFound = await User.findByPk(id);
    if (!userFound) return res.status(404).send({ message: "User not found" });
    res.send(userFound);
  };

  static createUser = async (
    req: Request<{}, {}, UserSchema>,
    res: Response,
  ) => {
    try {
      const { email, name, password } = req.body;

      const userCreate = await User.create({ email, name, password });
      res.status(201).json(userCreate);
    } catch (err) {
      console.error("Error al crear usuario", err);
      res.status(500).send({ message: "Error al crear usuario" });
    }
  };

  static updateUser = async (req: Request<{id: string}, {}, UserUpdateSchema>, res: Response) => {
    const { email, name } = req.body;
    const { id } = req.params
    const updatedUser = await User.findByPk(id)
    if (!updatedUser) return res.status(400).json({ message: 'Usuario no encontrado' })

    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.save();

    res.json(updatedUser)
  }
}
