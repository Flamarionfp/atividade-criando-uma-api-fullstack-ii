import { Router } from "express";
import { makeCreateAddToCartController } from "../controllers/cart/add-to-cart-controller";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";
import { makeListCartController } from "../controllers/cart/list-cart-controller";
import { makeRemoveFromCartController } from "../controllers/cart/remove-from-cart-controller";
import { makeClearCartController } from "../controllers/cart/clear-cart-controller";

const cartRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Gerenciamento do carrinho de compras
 */
const configureCartRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  const addToCartController = await makeCreateAddToCartController();

  /**
   * @swagger
   * /cart/add:
   *   post:
   *     summary: Adiciona um produto ao carrinho
   *     tags: [Cart]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productId:
   *                 type: integer
   *                 description: ID do produto a ser adicionado.
   *     responses:
   *       204:
   *         description: Produto adicionado com sucesso.
   *       400:
   *         description: Produto já está no carrinho.
   *       404:
   *         description: Produto não encontrado.
   */
  cartRouter.post(
    "/add",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    addToCartController.handle
  );

  const removeFromCartController = await makeRemoveFromCartController();

  /**
   * @swagger
   * /cart/remove/{id}:
   *   delete:
   *     summary: Remove um item do carrinho
   *     tags: [Cart]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do item do carrinho a ser removido.
   *     responses:
   *       204:
   *         description: Item removido com sucesso.
   *       404:
   *         description: Item do carrinho não encontrado.
   */
  cartRouter.delete(
    "/remove/:id",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    removeFromCartController.handle
  );

  const cleartCartController = await makeClearCartController();

  /**
   * @swagger
   * /cart/clear:
   *   delete:
   *     summary: Limpa todos os itens do carrinho do usuário
   *     tags: [Cart]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       204:
   *         description: Carrinho limpo com sucesso.
   */
  cartRouter.delete(
    "/clear",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    cleartCartController.handle
  );

  const listCartController = await makeListCartController();

  /**
   * @swagger
   * /cart:
   *   get:
   *     summary: Lista todos os itens no carrinho do usuário
   *     tags: [Cart]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de itens do carrinho.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/CartItem'
   */
  cartRouter.get(
    "/",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    listCartController.handle
  );
};

configureCartRoutes();

export default cartRouter;
