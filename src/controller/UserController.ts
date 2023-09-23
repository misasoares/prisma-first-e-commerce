import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, accessName } = req.body;

  const isUserUniqueEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if(isUserUniqueEmail){
    return res.status(400).json({message: "Já existe um usuário com este email."})
  }

  const hashPassword = await hash(password, 8)

  const user = await prisma.user.create({
    data: { name, email, password: hashPassword, Access:{
      connect:{
        name: accessName
      }
    } },
  });

  return res.json(user);
};

