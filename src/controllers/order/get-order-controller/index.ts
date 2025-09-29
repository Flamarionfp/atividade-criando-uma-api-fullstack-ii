import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { GetOrderService } from "../../../services/order/get-order.service";
import { GetOrderController } from "./get-order.controller";

export const makeGetOrderController = async (): Promise<GetOrderController> => {
  const orderRepository = new OrderSqliteRepository();
  await orderRepository.init();

  const getOrderService = new GetOrderService(orderRepository);
  const getOrderController = new GetOrderController(getOrderService);

  return getOrderController;
};
