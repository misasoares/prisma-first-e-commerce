import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await prisma.user.create({
    data: { name, email, password },
  });

  return res.json(user);
};
