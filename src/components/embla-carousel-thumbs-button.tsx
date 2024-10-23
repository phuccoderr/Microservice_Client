import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  image?: { id: string; url: string };
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={`mx-2 cursor-pointer hover:rounded-xl hover:border hover:border-stone-300 ${selected ? "rounded-xl border border-stone-300" : ""}`}
    >
      {image && (
        <Image
          onClick={onClick}
          src={image.url}
          alt="Product Image"
          width={50}
          height={50}
          className="h-[50px] rounded-xl"
        />
      )}
    </div>
  );
};
