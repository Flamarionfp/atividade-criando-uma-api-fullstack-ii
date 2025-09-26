import { NextFunction, Request, Response } from "express";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { GetOrderService } from "../../../services/order/get-order.service";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetOrderController {
  constructor(private readonly getOrderService: GetOrderService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);
      const authenticatedUser = userRequestSchema.parse(req.user);

      const order = await this.getOrderService.execute(id, authenticatedUser);

      return res.status(HttpStatus.OK).send(order);
    } catch (error) {
      next(error);
    }
  };
}
