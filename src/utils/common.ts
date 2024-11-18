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

export const extractTime = (dateString: string) => {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

const padZero = (number: number) => {
  return number.toString().padStart(2, "0");
};

// kí tự dài hơn 25 sẽ thành ...
export const formatText = (text: string) => {
  if (text.length > 25) {
    return text.slice(0, 23) + "...";
  }
  return text;
};
