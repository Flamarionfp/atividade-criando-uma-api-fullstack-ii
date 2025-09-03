import { UserSqliteRepository } from "../../../repository/sqlite/user-sqlite.repository";
import { DeleteUserService } from "../../../services/user";
import { DeleteUserController } from "./delete-user.controller";

export const makeDeleteUserController =
  async (): Promise<DeleteUserController> => {
    const userRepository = new UserSqliteRepository();
    await userRepository.init();

    const deleteUserService = new DeleteUserService(userRepository);
    const deleteUserController = new DeleteUserController(deleteUserService);

    return deleteUserController;
  };
