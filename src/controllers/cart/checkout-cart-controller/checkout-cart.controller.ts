import { NextFunction, Request, Response } from "express";
import { CheckoutCartService } from "../../../services/cart";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class CheckoutCartController {
  constructor(private readonly checkoutCartService: CheckoutCartService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { requesterId } = userRequestSchema.parse(req.user);

      const order = await this.checkoutCartService.execute(requesterId);

      res.status(HttpStatus.OK).send(order);
    } catch (error) {
      next(error);
    }
  };
}
