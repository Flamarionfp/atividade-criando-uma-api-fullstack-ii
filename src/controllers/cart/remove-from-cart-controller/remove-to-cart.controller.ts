import { HttpStatus } from "../../../core/http/http-status.enum";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { NextFunction, Request, Response } from "express";
import { RemoveFromCartService } from "../../../services/cart";

export class RemoveFromCartController {
  constructor(private readonly removeFromCartService: RemoveFromCartService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUser = userRequestSchema.parse(req.user);
      const { id } = idSchema.parse(req.params);

      await this.removeFromCartService.execute(id, authenticatedUser);

      return res
        .status(HttpStatus.OK)
        .send({ message: "Produto removido do carrinho com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
