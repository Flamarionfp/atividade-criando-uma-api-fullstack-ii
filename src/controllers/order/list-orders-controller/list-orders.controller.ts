import { NextFunction, Request, Response } from "express";
import { ListOrdersService } from "../../../services/order";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { userRequestSchema } from "../../../helpers/schemas/user.schema";
import { paginationSchema } from "../../../helpers/schemas/pagination.schema";

export class ListOrdersController {
  constructor(private readonly listOrdersService: ListOrdersService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const pagination = paginationSchema.parse(req.query);
      const authenticatedUser = userRequestSchema.parse(req.user);

      const orders = await this.listOrdersService.execute(
        authenticatedUser,
        pagination
      );

      return res.status(HttpStatus.OK).send(orders);
    } catch (error) {
      next(error);
    }
  };
}
