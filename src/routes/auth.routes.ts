import { Router } from "express";
import { makeAuthController } from "../controllers/auth";
import { checkApiKeyMiddleware } from "../middlewares/check-api-key-middleware";

const authRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação de usuários
 */

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Auth]
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequest'
 *     responses:
 *       200:
 *         description: Autenticação bem-sucedida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Login inválido ou api-key ausente/inválida
 */
makeAuthController().then((controller) => {
  authRouter.post("/", checkApiKeyMiddleware.handle, controller.handle);
});

export default authRouter;
