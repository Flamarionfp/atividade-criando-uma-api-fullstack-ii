import { UserSqliteRepository } from "../../../repository/sqlite/user-sqlite.repository";
import { CreateUserService } from "../../../services/user";
import { CreateUserController } from "./create-user.controller";

export const makeCreateUserController =
  async (): Promise<CreateUserController> => {
    const userRepository = new UserSqliteRepository();
    await userRepository.init();

    const createUserService = new CreateUserService(userRepository);
    const createUserController = new CreateUserController(createUserService);

    return createUserController;
  };
