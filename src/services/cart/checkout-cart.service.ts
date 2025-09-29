import { BadRequestException } from "../../core/error/exceptions/bad-request.exception";
import { calculateOrderTotal } from "../../helpers/misc/order";
import { CartRepository } from "../../repository/cart.repository";
import { OrderRepository } from "../../repository/order.repository";

export class CheckoutCartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository
  ) {}

  execute = async (requesterId: number) => {
    const cart = await this.cartRepository.findByUserIdForCheckout(requesterId);

    if (cart.length === 0) {
      throw new BadRequestException(
        "Não há itens no carrinho para fechar o pedido"
      );
    }

    const total = calculateOrderTotal(cart);

    const order = await this.orderRepository.create({
      userId: requesterId,
      totalAmount: total,
      items: cart.map((item) => ({
        productId: item.productId,
        price: item.productPrice,
        productName: item.productName,
        productTrade: item.productTrade,
        productModel: item.productModel,
        productYear: item.productYear,
        productSpecifications: item.productSpecifications,
        productThumb: item.productThumb,
      })),
    });

    await this.cartRepository.clear(requesterId);

    return order;
  };
}
