import { Router } from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeGetUserController,
  makeListUsersController,
  makeUpdateUserController,
} from "../controllers/user";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";
import { checkApiKeyMiddleware } from "../middlewares/check-api-key-middleware";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";

const userRouter = Router();

const configureUserRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  const createUserController = await makeCreateUserController();
  userRouter.post(
    "/",
    checkApiKeyMiddleware.handle,
    createUserController.handle
  );

  const listUsersController = await makeListUsersController();
  userRouter.get(
    "/",
    authMiddleware.handle,
    checkRoleMiddleware.admin,
    listUsersController.handle
  );

  const getUserController = await makeGetUserController();
  userRouter.get(
    "/:id",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    getUserController.handle
  );

  const updateUserController = await makeUpdateUserController();
  userRouter.put(
    "/:id",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    updateUserController.handle
  );

  const deleteUserController = await makeDeleteUserController();
  userRouter.delete(
    "/:id",
    authMiddleware.handle,
    checkRoleMiddleware.admin,
    deleteUserController.handle
  );
};

configureUserRoutes();

export default userRouter;
