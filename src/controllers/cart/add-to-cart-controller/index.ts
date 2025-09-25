import { CartSqliteRepository } from "../../../repository/sqlite/cart-sqlite.repository";
import { ProductSqliteRepository } from "../../../repository/sqlite/product-sqlite.repository";
import { AddToCartService } from "../../../services/cart";
import { AddToCartController } from "./add-to-cart.controller";

export const makeCreateAddToCartController =
  async (): Promise<AddToCartController> => {
    const productRepository = new ProductSqliteRepository();

    const cartRepository = new CartSqliteRepository();

    await Promise.all([productRepository.init(), cartRepository.init()]);

    const addToCartService = new AddToCartService(
      productRepository,
      cartRepository
    );

    const addToCartController = new AddToCartController(addToCartService);

    return addToCartController;
  };
