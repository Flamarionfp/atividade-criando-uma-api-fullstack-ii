import { Router } from "express";
import {
  makeCreateProductController,
  makeDeleteProductController,
  makeListProductsController,
  makeUpdateProductController,
} from "../controllers/product";

const productRouter = Router();

makeCreateProductController().then((controller) => {
  productRouter.post("/", controller.handle);
});

makeListProductsController().then((controller) => {
  productRouter.get("/", controller.handle);
});

makeUpdateProductController().then((controller) => {
  productRouter.put("/:id", controller.handle);
});

makeDeleteProductController().then((controller) => {
  productRouter.delete("/:id", controller.handle);
});

export default productRouter;
