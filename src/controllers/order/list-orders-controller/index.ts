import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { ListOrdersService } from "../../../services/order";
import { ListOrdersController } from "./list-orders.controller";

export const makeListOrdersController =
  async (): Promise<ListOrdersController> => {
    const orderRepository = new OrderSqliteRepository();
    await orderRepository.init();

    const listOrdersService = new ListOrdersService(orderRepository);
    const listOrdersController = new ListOrdersController(listOrdersService);

    return listOrdersController;
  };
