import { PaginatedResult, PaginationParams } from "../../@types/pagination";
import { Role } from "../../@types/role";
import { OrderSummaryDTO } from "../../dtos/order.dto";
import { AuthenticatedUserDTO } from "../../dtos/user.dto";
import { OrderRepository } from "../../repository/order.repository";

export class ListOrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  execute = async (
    authenticatedUser: AuthenticatedUserDTO,
    pagination?: PaginationParams
  ) => {
    const { requesterId, role } = authenticatedUser;

    let orders: PaginatedResult<OrderSummaryDTO>;

    if (role === Role.ADMIN) {
      orders = await this.orderRepository.listAll(pagination);

      return orders;
    }

    orders = await this.orderRepository.list(requesterId, pagination);

    return orders;
  };
}
