export type Discount = {
  id: string;
  name: string;
  code: string;
  expiry_date?: Date | undefined;
  sale: number;
  quantity: number;
};

export type CreateDiscount = Omit<Discount, "id">;
