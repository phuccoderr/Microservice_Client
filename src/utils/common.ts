import { Cart } from "@/types/cart.type";

export const formatDate = (date: string) => {
  return new Date(date).toISOString().split("T")[0];
};

export const getFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`;
};

export const getTotal = (carts: Cart[]) => {
  let total = 0;
  carts.forEach((cart) => {
    let sale = calSale(cart.product_id.price, cart.product_id.sale);
    total += sale * cart.quantity;
  });
  return total;
};

export const formatVnd = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};

export const calSale = (price: number, sale: number) => {
  return price - (price * sale) / 100;
};

const currentDate = new Date();
const formattedDate =
  currentDate.getDate().toString().padStart(2, "0") +
  "/" +
  (currentDate.getMonth() + 1).toString().padStart(2, "0") +
  "/" +
  currentDate.getFullYear();
console.log(formattedDate);
