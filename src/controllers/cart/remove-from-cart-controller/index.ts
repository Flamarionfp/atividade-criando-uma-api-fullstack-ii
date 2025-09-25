import { CartSqliteRepository } from "../../../repository/sqlite/cart-sqlite.repository";
import { RemoveFromCartService } from "../../../services/cart";

import { RemoveFromCartController } from "./remove-to-cart.controller";

export const makeRemoveFromCartController =
  async (): Promise<RemoveFromCartController> => {
    const cartRepository = new CartSqliteRepository();

    await cartRepository.init();

    const removeFromCartService = new RemoveFromCartService(cartRepository);

    const removeFromCartController = new RemoveFromCartController(
      removeFromCartService
    );

    return removeFromCartController;
  };
