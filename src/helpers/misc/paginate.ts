import { PaginatedResult, PaginationParams } from "../../@types/pagination";
import { DatabaseConnection } from "../../config/database";
import { PAGINATION_DEFAULT_LIMIT } from "../../constants/pagination";

export async function paginate<T>(
  connection: DatabaseConnection,
  baseQuery: string,
  params: any[] = [],
  pagination: PaginationParams = {}
): Promise<PaginatedResult<T>> {
  const page = pagination.page && pagination.page > 0 ? pagination.page : 1;

  const limit =
    pagination.limit && pagination.limit > 0
      ? pagination.limit
      : PAGINATION_DEFAULT_LIMIT;
  const offset = (page - 1) * limit;

  const paginatedQuery = `${baseQuery} LIMIT ? OFFSET ?`;
  const data = await connection.all<T[]>(
    paginatedQuery,
    ...params,
    limit,
    offset
  );

  const countQuery = `SELECT COUNT(*) as total FROM (${baseQuery}) as sub`;
  const [{ total }] = await connection.all<{ total: number }[]>(
    countQuery,
    ...params
  );

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data,
  };
}
