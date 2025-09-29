import { OrderSqliteRepository } from "../../../repository/sqlite/order-sqlite.repository";
import { UserSqliteRepository } from "../../../repository/sqlite/user-sqlite.repository";
import { DeleteUserService } from "../../../services/user";
import { DeleteUserController } from "./delete-user.controller";

export const makeDeleteUserController =
  async (): Promise<DeleteUserController> => {
    const userRepository = new UserSqliteRepository();
    const orderRepository = new OrderSqliteRepository();

    await Promise.all([userRepository.init(), orderRepository.init()]);

    const deleteUserService = new DeleteUserService(
      userRepository,
      orderRepository
    );

    const deleteUserController = new DeleteUserController(deleteUserService);

    return deleteUserController;
  };
