import { UserSqliteRepository } from "../../repository/sqlite/user-sqlite.repository";
import { AuthMiddleware } from "./auth.middleware";

export const makeAuthMiddleware = async (): Promise<AuthMiddleware> => {
  const userRepository = new UserSqliteRepository();
  await userRepository.init();

  const authMiddleware = new AuthMiddleware(userRepository);

  return authMiddleware;
};
