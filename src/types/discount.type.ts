export type Discount = {
  id: string;
  name: string;
  code: string;
  expiry_date: Date;
  sale: number;
  quantity: number;
};

export type CreateDiscount = Omit<Discount, "id">;
