import { CreateOrderDTO, OrderDTO, OrderSummaryDTO } from "../dtos/order.dto";

export interface OrderRepository {
  init(): Promise<void>;
  list: (userId: number) => Promise<OrderSummaryDTO[]>;
  listAll: () => Promise<OrderSummaryDTO[]>;
  findById: (id: number) => Promise<OrderDTO | undefined>;
  create: (order: CreateOrderDTO) => Promise<OrderDTO>;
  deleteByUserId: (userId: number) => Promise<void>;
}
