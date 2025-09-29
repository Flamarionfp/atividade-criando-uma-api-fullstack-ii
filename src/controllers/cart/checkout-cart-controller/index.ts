import { CartSqliteRepository } from "../../../repository/sqlite/cart-sqlite.repository";
import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { CheckoutCartService } from "../../../services/cart";
import { CheckoutCartController } from "./checkout-cart.controller";

export const makeCheckoutCartController =
  async (): Promise<CheckoutCartController> => {
    const cartRepository = new CartSqliteRepository();
    const orderRepository = new OrderSqliteRepository();

    await Promise.all([cartRepository.init(), orderRepository.init()]);

    const checkoutCartService = new CheckoutCartService(
      cartRepository,
      orderRepository
    );

    const checkoutCartController = new CheckoutCartController(
      checkoutCartService
    );

    return checkoutCartController;
  };
