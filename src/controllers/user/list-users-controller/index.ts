import { UserSqliteRepository } from "../../../repository/sqlite/user-sqlite.repository";
import { CreateUserService, ListUsersService } from "../../../services/user";
import { ListUsersController } from "./list-users.controller";

export const makeListUsersController =
  async (): Promise<ListUsersController> => {
    const userRepository = new UserSqliteRepository();
    await userRepository.init();

    const listUsersService = new ListUsersService(userRepository);
    const listUsersController = new ListUsersController(listUsersService);

    return listUsersController;
  };
