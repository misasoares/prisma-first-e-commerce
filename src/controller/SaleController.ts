import { Request, Response } from "express";
import { prisma } from "../database/prisma";

export const createSale = async (req: Request, res: Response) => {
  const { products, userSellerId } = req.body;
  const { id } = req.user;

  try {
    const productsByDataBase = await prisma.product.findMany({
      where: {
        id: { in: products.map((product: any) => product.id) },
      },
    });

    const productWithQuantity = productsByDataBase.map((product) => {
      const { id, name, price } = product;
      const quantity = products.find((p: any) => p.id === product.id).quantity;
      return {
        id,
        name,
        price,
        quantity,
      };
    });

    let total = 0;
    for (const product of productWithQuantity) {
      total += product.price * parseInt(product.quantity);
    }

    if(id === userSellerId){
        return res.status(400).json({message: "Não é possível criar uma venda com ID de compradore vendedor iguais."})
    }

    const sale = await prisma.sale.create({
      data: {
        total_value: total,
        Seller: { connect: { id: userSellerId } },
        Buyer: { connect: { id } },
        SaleProduct: {
          create: productWithQuantity.map((product) => ({
            Product: { connect: { id: product.id } },
            quantity: product.quantity,
          })),
        },
      },
      include: {
        SaleProduct: true,
      },
    });

    productWithQuantity.map(async (product) => {
      await prisma.product.updateMany({
        where: { id: product.id },
        data: {
          amount: {
            decrement: parseInt(product.quantity),
          },
        },
      });
    });

    return res.status(201).json({ sale, message: "Compra realizada com sucesso." });
  } catch (error) {
    return res.status(404).json(error);
  }
};
