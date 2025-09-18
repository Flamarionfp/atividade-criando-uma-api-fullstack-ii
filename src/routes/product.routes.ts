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

const configureProductRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();
  productRouter.use(authMiddleware.handle);

  const createProductController = await makeCreateProductController();
  productRouter.post(
    "/",
    checkRoleMiddleware.admin,
    createProductController.handle
  );

  const listProductsController = await makeListProductsController();
  productRouter.get("/", listProductsController.handle);

  const getProductController = await makeGetProductController();
  productRouter.get("/:id", getProductController.handle);

  const updateProductController = await makeUpdateProductController();
  productRouter.put(
    "/:id",
    checkRoleMiddleware.admin,
    updateProductController.handle
  );

  const deleteProductController = await makeDeleteProductController();
  productRouter.delete(
    "/:id",
    checkRoleMiddleware.admin,
    deleteProductController.handle
  );
};

configureProductRoutes();

export default productRouter;
