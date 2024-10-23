"use client";
import EmblaCarousel from "@/components/embla-carousel";
import RatingReview from "@/components/rating-review";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAddToCart } from "@/hooks/query-cart/useAddToCart";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useGetRatings } from "@/hooks/query-reviews/useGetRatings";
import { calSale, formatDate, formatVnd } from "@/utils/common";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductDetailPageProps {
  params: {
    productId: string;
  };
}

const ProductDetailPage = ({ params }: ProductDetailPageProps) => {
  const productId = params.productId;
  const { data: product } = useGetProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const { data: ratings } = useGetRatings(productId);
  const mutation = useAddToCart();

  //carousel

  const handleQuantity = (quantity: number) => {
    if (quantity > 0) {
      setQuantity(quantity);
    }
  };

  const handleAddToCart = () => {
    mutation.mutate({ product_id: productId, quantity });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <div className="flex justify-center md:w-1/2">
          {product && <EmblaCarousel product={product} />}
        </div>

        <div className="md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">{product?.name}</h1>
          <p className="mb-4">
            <RatingReview readonly initialValue={product?.average_rating} />
            <span className="ml-2 text-gray-400">
              ({product?.review_count} đánh giá)
            </span>
          </p>
          {product?.sale && product?.sale > 0 ? (
            <div className="flex gap-2 text-2xl">
              <h1 className="font-bold line-through">
                {formatVnd(product.price)}
              </h1>
              <h1>{formatVnd(calSale(product.price, product.sale))} </h1>
            </div>
          ) : (
            <h1 className="text-2xl font-bold">
              {formatVnd(product?.price ?? 0)}
            </h1>
          )}

          {/* Quantity Selector */}
          <div className="mb-4 flex items-center">
            <Button
              onClick={() => handleQuantity(quantity - 1)}
              variant="outline"
              size="icon"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              onChange={(e) => handleQuantity(Number(e.target.value))}
              className="mx-2 w-16 text-center"
              value={quantity}
            />
            <Button
              onClick={() => handleQuantity(quantity + 1)}
              variant="outline"
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="mb-4 w-[200px] bg-blue-400 hover:bg-blue-500"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Thêm vào giỏ hàng
          </Button>

          {/* Product Details */}
          <h2 className="mb-2 text-xl font-semibold">Mô tả</h2>
          <p className="text-sm italic text-zinc-400">{product?.description}</p>
        </div>
      </div>
      <div className="mx-8 mt-8 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">Đánh giá khách hàng</h2>
        <div className="flex flex-col rounded-lg border border-b-0 border-stone-300">
          {ratings?.entities?.map((item) => (
            <>
              <div key={item.id} className="mx-4 flex p-2">
                <div className="flex items-center gap-2">
                  <Avatar className="m-2">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{item.customer_id}</h3>
                    <RatingReview
                      readonly
                      initialValue={item.rating}
                      size={25}
                    />
                    <p className="text-sm text-muted-foreground">
                      {item.headline}
                    </p>
                  </div>
                </div>

                <div className="ml-auto flex">
                  <h1>{formatDate(item.created_at)}</h1>
                </div>
              </div>
              <p className="ml-20 font-medium text-stone-500">{item.comment}</p>
              <Separator className="mx-auto my-2 w-[98%] bg-stone-300" />
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
