import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, amount } = req.body;
  const { storeId } = req.params;

  const product = await prisma.product.create({
    data: {
      name,
      price,
      amount,
      Store: {
        connect: {
          id: storeId,
        },
      },
    },
  });

  return res.json(product);
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();

  return res.json(products);
  } catch (error) {
    return res.status(400).json(error)
  }
};
