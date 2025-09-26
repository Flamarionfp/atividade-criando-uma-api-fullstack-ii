import { connectDatabase, DatabaseConnection } from "../../config/database";
import { OrderDTO } from "../../dtos/order.dto";
import { OrderRepository } from "../order.repository";

export class OrderSqliteRepository implements OrderRepository {
  private connection!: DatabaseConnection;

  async init(): Promise<void> {
    this.connection = await connectDatabase();
  }

  findById = async (id: number) => {};

  list = async (userId: number) => {};

  listAll = async () => {};
}
