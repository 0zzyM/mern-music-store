import type { Request, Response } from "express";
import { getAllUsers, getUserById } from "../services/userService.js";

export const getUsers = async (
  _req: Request<{ _id: string }>,
  res: Response,
) => {
  const users = await getAllUsers();

  res.status(200).json(users);
};

export const getUser = async (req: Request<{ _id: string }>, res: Response) => {
  const { _id } = req.params;

  const product = await getUserById(_id);

  res.status(200).json(product);
};
