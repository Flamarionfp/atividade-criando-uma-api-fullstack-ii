import { CartSqliteRepository } from "../../../repository/sqlite/cart-sqlite.repository";
import { ListCartService } from "../../../services/cart";
import { ListCartController } from "./list-cart.controller";

export const makeListCartController = async (): Promise<ListCartController> => {
  const cartRepository = new CartSqliteRepository();
  await cartRepository.init();

  const listCartService = new ListCartService(cartRepository);
  const listCartController = new ListCartController(listCartService);

  return listCartController;
};
