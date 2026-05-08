import { User } from "../database/schema.ts";
import type { UserSchema, UserUpdateSchema } from "../models/schema.ts";
import type {
  EndPointAsync,
  EndPointCreateAsync,
  EndPointUpdateAsync,
  EndPointWithIdAsync,
} from "../definitions/endpoints.ts";

export class UserController {
  static getAll: EndPointAsync = async (_, res) => {
    const users = await User.findAll();

    res.json(users);
  };

  static getById: EndPointWithIdAsync = async (req, res) => {
    const { id } = req.params;
    const userFound = await User.findByPk(id);
    if (!userFound) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    res.send(userFound);
  };

  static createUser: EndPointCreateAsync<UserSchema> = async (req, res) => {
    const userCreate = await User.create(req.body);
    res.status(201).json(userCreate);
  };

  static updateUser: EndPointUpdateAsync<UserUpdateSchema> = async (req,res) => {
    const { email, name } = req.body;
    const { id } = req.params;
    const updatedUser = await User.findByPk(id);
    if (!updatedUser) {
      res.status(400).json({ message: "Usuario no encontrado" });
      return;
    }

    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.save();

    res.json(updatedUser);
  };
}
