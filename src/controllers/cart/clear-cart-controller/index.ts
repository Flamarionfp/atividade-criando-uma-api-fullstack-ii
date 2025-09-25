import { CartSqliteRepository } from "../../../repository/sqlite/cart-sqlite.repository";
import { ClearCartService } from "../../../services/cart";
import { ClearCartController } from "./clear-cart.controller";

export const makeClearCartController =
  async (): Promise<ClearCartController> => {
    const cartRepository = new CartSqliteRepository();

    await cartRepository.init();

    const clearCartService = new ClearCartService(cartRepository);

    const cleartCartController = new ClearCartController(clearCartService);

    return cleartCartController;
  };
