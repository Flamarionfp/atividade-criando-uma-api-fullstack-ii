import { CartDTO } from "../../dtos/cart.dto";

export const calculateOrderTotal = (cart: CartDTO[]) => {
  return cart.reduce((acc, item) => {
    return acc + item.productPrice;
  }, 0);
};
