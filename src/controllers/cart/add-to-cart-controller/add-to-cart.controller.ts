import { NextFunction, Request, Response } from "express";
import { AddToCartService } from "../../../services/cart";
import { addToCartBodySchema } from "../../../helpers/schemas/cart.schema";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class AddToCartController {
  constructor(private readonly addToCartService: AddToCartService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { requesterId } = userRequestSchema.parse(req.user);
      const { productId } = addToCartBodySchema.parse(req.body);

      await this.addToCartService.execute(productId, requesterId);

      return res
        .status(HttpStatus.OK)
        .send({ message: "Produto adicionado ao carrinho com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
