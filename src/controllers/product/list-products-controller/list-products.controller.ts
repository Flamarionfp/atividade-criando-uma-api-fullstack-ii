import { NextFunction, Request, Response } from "express";
import { ListProductsService } from "../../../services/product";
import { HttpStatus } from "../../../core/http/http-status.enum";
import { filterProductsQuerySchema } from "../../../helpers/schemas/product.schema";

export class ListProductsController {
  constructor(private readonly listProductsService: ListProductsService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedQuery = filterProductsQuerySchema.parse(req.query);

      const products = await this.listProductsService.execute(parsedQuery);

      return res.status(HttpStatus.OK).send(products);
    } catch (error) {
      next(error);
    }
  };
}
