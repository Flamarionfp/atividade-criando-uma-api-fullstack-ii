import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { ListProductsService } from "../../../services/product";

import { ListProductsController } from "./list-products.controller";

export const makeListProductsController =
  async (): Promise<ListProductsController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const listProductsService = new ListProductsService(productRepository);
    const listProductsController = new ListProductsController(
      listProductsService
    );

    return listProductsController;
  };
