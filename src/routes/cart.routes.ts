import { Router } from "express";
import { makeCreateAddToCartController } from "../controllers/cart/add-to-cart-controller";
import { makeAuthMiddleware } from "../middlewares/auth-middleware";
import { checkRoleMiddleware } from "../middlewares/check-role-middleware";
import { makeListCartController } from "../controllers/cart/list-cart-controller";
import { makeRemoveFromCartController } from "../controllers/cart/remove-from-cart-controller";
import { makeClearCartController } from "../controllers/cart/clear-cart-controller";

const cartRouter = Router();

const configureCartRoutes = async () => {
  const authMiddleware = await makeAuthMiddleware();

  const addToCartController = await makeCreateAddToCartController();

  cartRouter.post(
    "/add",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    addToCartController.handle
  );

  const removeFromCartController = await makeRemoveFromCartController();

  cartRouter.delete(
    "/remove/:id",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    removeFromCartController.handle
  );

  const cleartCartController = await makeClearCartController();

  cartRouter.delete(
    "/clear",
    authMiddleware.handle,
    checkRoleMiddleware.customer,
    cleartCartController.handle
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
