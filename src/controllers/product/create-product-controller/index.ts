import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { CreateProductService } from "../../../services/product";
import { CreateProductController } from "./create-product.controller";

export const makeCreateProductController =
  async (): Promise<CreateProductController> => {
    const productRepository = new ProductSqliteRepository();
    await productRepository.init();

    const createProductService = new CreateProductService(productRepository);
    const createProductController = new CreateProductController(
      createProductService
    );

    return createProductController;
  };
