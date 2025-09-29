import { NextFunction, Request, Response } from "express";
import { ListOrdersService } from "../../../services/order";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";

export class ListOrdersController {
  constructor(private readonly listOrdersService: ListOrdersService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authenticatedUser = userRequestSchema.parse(req.user);
      const orders = await this.listOrdersService.execute(authenticatedUser);

      return res.status(HttpStatus.OK).send(orders);
    } catch (error) {
      next(error);
    }
  };
}
