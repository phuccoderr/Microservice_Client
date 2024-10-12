import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useAddToCart } from "@/hooks/query-cart/useAddToCart";
import { useProductStore } from "@/store/useProductStore";
import { MinusIcon, PlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ModalAddCart = () => {
  const [quantity, setQuantity] = useState(1);
  const { modalAddCart, setModalAddCart, id, url, name, description } =
    useProductStore();
  const mutation = useAddToCart();

  const handleQuantity = (quantity: number) => {
    if (quantity > 0) {
      setQuantity(quantity);
    }
  };

  const handleAddToCart = () => {
    mutation.mutate({ product_id: id, quantity });
    setModalAddCart(false);
  };

  return (
    <Dialog open={modalAddCart} onOpenChange={setModalAddCart}>
      <DialogContent className="!bg-slate-100 text-black">
        <DialogHeader>
          <DialogTitle>
            <div className="flex gap-2">
              <Image
                src={url}
                width={100}
                height={100}
                alt="Picture of the author"
              />
              <h1>{name}</h1>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Separator className="bg-slate-300" />
        <div className="flex flex-col gap-4">
          <h1>{description}</h1>
        </div>
        <Separator className="bg-slate-300" />
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => handleQuantity(quantity - 1)}
              variant={"outline"}
              size={"icon"}
              className="rounded-full"
            >
              <MinusIcon />
            </Button>
            {quantity}
            <Button
              onClick={() => handleQuantity(quantity + 1)}
              variant={"outline"}
              size={"icon"}
              className="rounded-full"
            >
              <PlusIcon />
            </Button>
          </div>
          <Button onClick={handleAddToCart}>Đặt món</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddCart;
