import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/useProductStore";
import React from "react";
import { MdOutlinePostAdd } from "react-icons/md";

interface ButtonReviewProps {
  id: string;
}

const ButtonReview = (props: ButtonReviewProps) => {
  const { setModalReview } = useProductStore();
  return (
    <Button
      onClick={() => setModalReview(true, props.id)}
      variant={"ghost"}
      size={"sm"}
      className={"ml-2 hover:bg-transparent"}
    >
      <MdOutlinePostAdd className="h-4 w-4" />
    </Button>
  );
};

export default ButtonReview;
