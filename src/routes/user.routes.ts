import { Router } from "express";
import {
  makeCreateUserController,
  makeDeleteUserController,
  makeListUsersController,
  makeUpdateserController,
} from "../controllers/user";

const userRouter = Router();

makeCreateUserController().then((controller) => {
  userRouter.post("/", controller.handle);
});

makeListUsersController().then((controller) => {
  userRouter.get("/", controller.handle);
});

makeUpdateserController().then((controller) => {
  userRouter.put("/:id", controller.handle);
});

makeDeleteUserController().then((controller) => {
  userRouter.delete("/:id", controller.handle);
});

export default userRouter;
