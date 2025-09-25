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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Gerenciamento de usuários
 */

const configureUserRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  const createUserController = await makeCreateUserController();

  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Cria um novo usuário (cliente ou admin)
   *     tags: [Users]
   *     security:
   *       - ApiKeyAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateUserRequest'
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponse'
   *       400:
   *         description: Dados inválidos ou usuário já existente.
   *       401:
   *         description: api-key ausente/inválida.
   */
  userRouter.post(
    "/",
    checkApiKeyMiddleware.handle,
    createUserController.handle
  );

  const listUsersController = await makeListUsersController();

  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Lista todos os usuários (Apenas Admins)
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de usuários.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/UserResponse'
   *       403:
   *         description: Acesso negado.
   */
  userRouter.get(
    "/",
    authMiddleware.handle,
    checkRoleMiddleware.admin,
    listUsersController.handle
  );

  const getUserController = await makeGetUserController();

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Busca um usuário pelo ID (Apenas o próprio usuário)
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário.
   *     responses:
   *       200:
   *         description: Detalhes do usuário.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponse'
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Usuário não encontrado.
   */
  userRouter.get(
    "/:id",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    getUserController.handle
  );

  const updateUserController = await makeUpdateUserController();

  /**
   * @swagger
   * /user/{id}:
   *   put:
   *     summary: Atualiza um usuário (Apenas o próprio usuário)
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser atualizado.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateUserRequest'
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/UserResponse'
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Usuário não encontrado.
   */
  userRouter.put(
    "/:id",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    updateUserController.handle
  );

  const deleteUserController = await makeDeleteUserController();

  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     summary: Deleta um usuário (Apenas Admins)
   *     tags: [Users]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do usuário a ser deletado.
   *     responses:
   *       204:
   *         description: Usuário deletado com sucesso.
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Usuário não encontrado.
   */
  userRouter.delete(
    "/:id",
    authMiddleware.handle,
    checkRoleMiddleware.admin,
    deleteUserController.handle
  );
};

configureUserRoutes();

export default userRouter;
