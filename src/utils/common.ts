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
    total += cart.price * cart.quantity;
  });
  return total;
};

export const formatVnd = (number: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
};
