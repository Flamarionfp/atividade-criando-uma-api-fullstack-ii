import "dotenv/config";
import express, { Response } from "express";
import { ExceptionHandlerMiddleware } from "./middlewares/exception-handler.middleware";
import productRouter from "./routes/product.routes";
import * as z from "zod";
import userRouter from "./routes/user.routes";

z.config(z.locales.pt());

const app = express();
app.use(express.json());
app.use("/product", productRouter);
app.use("/user", userRouter);
app.use(new ExceptionHandlerMiddleware().handle);

const port = process.env.PORT || 4444;

app.get("/", (_, res: Response) => {
  res.send({ status: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
