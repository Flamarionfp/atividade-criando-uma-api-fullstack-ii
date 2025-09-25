import { Router } from "express";
import { makeCreateAddToCartController } from "../controllers/cart/add-to-cart-controller";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";
import { makeListCartController } from "../controllers/cart/list-cart-controller";

const cartRouter = Router();

const configureCartRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  const addToCartController = await makeCreateAddToCartController();

  cartRouter.post(
    "/",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    addToCartController.handle
  );

  const listCartController = await makeListCartController();

  cartRouter.get(
    "/",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    listCartController.handle
  );
};

configureCartRoutes();

export default cartRouter;
