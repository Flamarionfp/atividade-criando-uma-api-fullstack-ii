import { HttpStatus } from "../../../core/http/http-status.enum";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { NextFunction, Request, Response } from "express";
import { ListCartService } from "../../../services/cart";

export class ListCartController {
  constructor(private readonly listCartService: ListCartService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { requesterId } = userRequestSchema.parse(req.user);

      const cart = await this.listCartService.execute(requesterId);

      return res.status(HttpStatus.OK).send(cart);
    } catch (error) {
      next(error);
    }
  };
}
