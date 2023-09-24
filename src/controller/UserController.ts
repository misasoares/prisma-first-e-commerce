import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { hash } from "bcryptjs";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, accessName } = req.body;

  const isUserUniqueEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const isAccessName = await prisma.access.findUnique({
    where: {
      name: accessName,
    },
  });

  if (!isAccessName) {
    return res.status(400).json({ message: "Este nível de acesso não existe." });
  }

  if (isUserUniqueEmail) {
    return res.status(400).json({ message: "Já existe um usuário com este email." });
  }

  const hashPassword = await hash(password, 8);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
      userAccess: {
        create: {
          Access: {
            connect: {
              name: accessName,
            },
          },
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      userAccess:{
        select:{
          Access:{
            select:{
              name:true
            }
          }
        }
      }
    },
  });

  return res.json(user);
};


export const deleteAllUsers = async (req:Request, res:Response)=>{
  prisma.user.deleteMany()
  return res.status(200).json({message: "Todos os usuarios foram excluidos."})
}

export const getAllUsers = async (req:Request, res:Response)=>{
  const users = await prisma.user.findMany({
    select:{
      id: true,
      name:true,
      email:true,
      userAccess:{
        select:{
          Access:{
            select:{
              name:true
            }
          }
        }
      }
    }
  })

  return res.status(200).json(users)
}