import { Router } from "express";
import {
  makeCreateProductController,
  makeDeleteProductController,
  makeGetProductController,
  makeListProductsController,
  makeUpdateProductController,
} from "../controllers/product";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";

const productRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de produtos
 */

const configureProductRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();
  productRouter.use(authMiddleware.handle);

  const createProductController = await makeCreateProductController();

  /**
   * @swagger
   * /product:
   *   post:
   *     summary: Cria um novo produto (Apenas Admins)
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateProductRequest'
   *     responses:
   *       201:
   *         description: Produto criado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Dados inválidos ou produto já existente.
   *       403:
   *         description: Acesso negado.
   */
  productRouter.post(
    "/",
    checkRoleMiddleware.admin,
    createProductController.handle
  );

  const listProductsController = await makeListProductsController();

  /**
   * @swagger
   * /product:
   *   get:
   *     summary: Lista todos os produtos
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de produtos.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Product'
   */
  productRouter.get("/", listProductsController.handle);

  const getProductController = await makeGetProductController();

  /**
   * @swagger
   * /product/{id}:
   *   get:
   *     summary: Busca um produto pelo ID
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do produto.
   *     responses:
   *       200:
   *         description: Detalhes do produto.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       404:
   *         description: Produto não encontrado.
   */
  productRouter.get("/:id", getProductController.handle);

  const updateProductController = await makeUpdateProductController();

  /**
   * @swagger
   * /product/{id}:
   *   put:
   *     summary: Atualiza um produto (Apenas Admins)
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do produto a ser atualizado.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateProductRequest'
   *     responses:
   *       200:
   *         description: Produto atualizado com sucesso.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Product'
   *       400:
   *         description: Dados inválidos.
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Produto não encontrado.
   */
  productRouter.put(
    "/:id",
    checkRoleMiddleware.admin,
    updateProductController.handle
  );

  const deleteProductController = await makeDeleteProductController();

  /**
   * @swagger
   * /product/{id}:
   *   delete:
   *     summary: Deleta um produto (Apenas Admins)
   *     tags: [Products]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do produto a ser deletado.
   *     responses:
   *       204:
   *         description: Produto deletado com sucesso.
   *       403:
   *         description: Acesso negado.
   *       404:
   *         description: Produto não encontrado.
   */
  productRouter.delete(
    "/:id",
    checkRoleMiddleware.admin,
    deleteProductController.handle
  );
};

configureProductRoutes();

export default productRouter;
