"use client";
import ModalAddCart from "@/components/home/modal-add-cart";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { useAddToCart } from "@/hooks/query-cart/useAddToCart";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { formatVnd } from "@/utils/common";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
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
  const mutation = useAddToCart();

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
        {/* Product Images */}
        <div className="flex justify-center md:w-1/2">
          <Carousel className="w-[300px] rounded-xl border bg-white">
            <CarouselContent>
              <CarouselItem>
                <Image
                  src={product?.url ?? ""}
                  alt="Product Image"
                  width={300}
                  height={300}
                  className="h-[300px] rounded-xl"
                />
              </CarouselItem>
              {product?.extra_images?.map((image) => (
                <CarouselItem key={image.id}>
                  <Image
                    src={image.url}
                    alt="Product Image"
                    width={300}
                    height={300}
                    className="h-[300px] rounded-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="mb-4 text-3xl font-bold">{product?.name}</h1>
          <p className="mb-4 text-2xl font-bold">
            {formatVnd(product?.price ?? 0)}
          </p>
          <p className="mb-4">
            Mỳ Hải Sản Hàm Cay Lớn - Sản phẩm mới của Omega Noodles
          </p>

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
    </div>
  );
};

export default ProductDetailPage;
