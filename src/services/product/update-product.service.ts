import { id } from "zod/v4/locales/index.cjs";
import { ProductRepository } from "../../repository/product.repository";
import { UpdateProductDTO } from "../../dtos/product.dto";
import { NotFoundException } from "../../core/error/exceptions/not-found.exception";

export class UpdateProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  execute = async (id: number, dto: UpdateProductDTO) => {
    const existingProduct = await this.productRepository.findById(id);

    if (!existingProduct) {
      throw new NotFoundException("Esse produto não existe");
    }

    if (dto.name && dto.name !== existingProduct.name) {
      const productWithNewName = await this.productRepository.findByName(
        dto.name
      );

      if (productWithNewName) {
        throw new NotFoundException("Já existe um produto com esse nome");
      }
    }

    const updatedProduct = await this.productRepository.update(id, dto);

    return updatedProduct;
  };
}
