import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { GetProductService } from "../../../services/product";
import { GetProductController } from "./get-product-controller.controller";

export const makeGetProductController =
  async (): Promise<GetProductController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const getProductService = new GetProductService(productRepository);
    const getProductController = new GetProductController(getProductService);

    return getProductController;
  };
