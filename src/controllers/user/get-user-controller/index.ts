import { UserSqliteRepository } from "../../../repository/sqlite/user-sqlite.repository";
import { GetUserService } from "../../../services/user";
import { GetUserController } from "./get-user.controller";

export const makeGetUserController = async (): Promise<GetUserController> => {
  const userRepository = new UserSqliteRepository();
  await userRepository.init();

  const getUserService = new GetUserService(userRepository);
  const getUserController = new GetUserController(getUserService);

  return getUserController;
};
