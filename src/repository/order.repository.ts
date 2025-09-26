import { OrderDTO } from "../dtos/order.dto";

export interface OrderRepository {
  init(): Promise<void>;
  list: (userId: number) => Promise<OrderDTO[]>;
  listAll: () => Promise<OrderDTO[]>;
  findById: (id: number) => Promise<OrderDTO | undefined>;
}
