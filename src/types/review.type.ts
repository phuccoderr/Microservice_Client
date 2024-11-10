export type Review = {
  id: string;
  name: string;
  headline: string;
  comment: string;
  rating: number;
  product_id: string;
  customer_id: string;
  created_at: string;
  updated_at: string;
};

export type CreateRevew = Pick<Review, "headline" | "comment" | "rating">;
