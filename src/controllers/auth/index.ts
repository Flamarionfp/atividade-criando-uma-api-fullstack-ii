import { UserSqliteRepository } from "../../repository/sqlite/user-sqlite.repository";
import { AuthService } from "../../services/auth";
import { AuthController } from "./auth.controller";

export const makeAuthController = async (): Promise<AuthController> => {
  const userRepository = new UserSqliteRepository();
  await userRepository.init();

  const authService = new AuthService(userRepository);
  const authController = new AuthController(authService);

  return authController;
};
