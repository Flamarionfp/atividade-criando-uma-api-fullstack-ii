import { Router } from "express";
import { makeGetOrderController } from "../controllers/order/get-order-controller";
import { makeListOrdersController } from "../controllers/order/list-orders-controller";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";

const orderRouter = Router();

const configureOrderRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  const getOrderController = await makeGetOrderController();

  /**
   * @swagger
   * /order/{id}:
   *   get:
   *     summary: Busca um pedido pelo ID
   *     tags: [Orders]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do pedido.
   *     responses:
   *       200:
   *         description: Detalhes do pedido.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Order'
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Pedido não encontrado.
   */
  orderRouter.get("/:id", authMiddleware.handle, getOrderController.handle);

  const listOrdersController = await makeListOrdersController();

  /**
   * @swagger
   * /order:
   *   get:
   *     summary: Lista todos os pedidos do usuário autenticado (ou todos os pedidos se for admin)
   *     tags: [Orders]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           example: 1
   *         description: Número da página
   *       - in: query
   *         name: limit
   *         schema:
   *           type: integer
   *           example: 10
   *         description: Quantidade de itens por página
   *     responses:
   *       200:
   *         description: Lista paginada de pedidos
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/PaginatedOrders'
   *       403:
   *         description: Acesso negado
   */
  orderRouter.get("/", authMiddleware.handle, listOrdersController.handle);
};

configureOrderRoutes();

export default orderRouter;
