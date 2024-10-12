import { cartsAxiosClient } from "@/api/axiosClient";
import { remove } from "lodash";

export const cartsApi = {
  get() {
    const url = "";
    return cartsAxiosClient.get(url);
  },
  addToCart(quantity: number, product_id: string) {
    const url = "add";
    return cartsAxiosClient.post(url, { quantity, product_id });
  },
  deleteProduct(product_id: string) {
    const url = `product/${product_id}`;
    return cartsAxiosClient.delete(url);
  },
};
