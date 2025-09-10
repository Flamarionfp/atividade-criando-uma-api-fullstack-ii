import { NextFunction, Request, Response } from "express";
import { idSchema } from "../../../helpers/schemas/id.schema";
import { GetProductService } from "../../../services/product";
import { HttpStatus } from "../../../core/http/http-status.enum";

export class GetProductController {
  constructor(private readonly getProductService: GetProductService) {}

  handle = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = idSchema.parse(req.params);

      const product = await this.getProductService.execute(id);

      return res.status(HttpStatus.OK).send(product);
    } catch (error) {
      next(error);
    }
  };
}
