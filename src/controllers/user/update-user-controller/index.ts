import { UserSqliteRepository } from "../../../repository/sqlite/user-sqlite.repository";
import { CreateUserService, UpdateUserService } from "../../../services/user";

import { UpdateUserController } from "./update-user.controller";

export const makeUpdateserController =
  async (): Promise<UpdateUserController> => {
    const userRepository = new UserSqliteRepository();
    await userRepository.init();

    const updateUserService = new UpdateUserService(userRepository);
    const updateUserController = new UpdateUserController(updateUserService);

    return updateUserController;
  };
