import { Router } from "express";
import { makeAuthController } from "../controllers/auth";
import { checkApiKeyMiddleware } from "../middlewares/check-api-key-middleware";

const authRouter = Router();

makeAuthController().then((controller) => {
  authRouter.post("/", checkApiKeyMiddleware.handle, controller.handle);
});

export default authRouter;
