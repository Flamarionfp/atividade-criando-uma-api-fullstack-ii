import { NextFunction, Request, Response } from "express";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { ClearCartService } from "../../../services/cart";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class ClearCartController {
  constructor(private readonly clearCartService: ClearCartService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUser = userRequestSchema.parse(req.user);

      await this.clearCartService.execute(authenticatedUser.requesterId);

      return res
        .status(HttpStatus.OK)
        .send({ message: "Carrinho limpo com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
