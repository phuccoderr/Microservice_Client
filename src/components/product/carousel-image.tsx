import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";

interface CarouselImageProps {
  listImages: {
    id: string;
    url: string;
  }[];
}

const CarouselImage = ({ listImages }: CarouselImageProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (api) {
      const handleSelect = () => setSelectedIndex(api.selectedScrollSnap());
      api.on("select", handleSelect);
    }
  }, [api]);

  return (
    <>
      <Carousel className="w-full max-w-xs" setApi={setApi}>
        <CarouselContent>
          {listImages.map((item, index) => (
            <CarouselItem key={index}>
              <img
                src={item.url}
                className="h-[300px] w-full"
                width={200}
                alt={item.id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel className="mt-8 w-1/2 max-w-sm">
        <CarouselContent className="gap-4">
          {listImages.map((item, index) => (
            <Button
              size={"sm"}
              key={item.id}
              className={`h-[50px] w-[50px] p-0 ${index === selectedIndex ? "border border-sky-300" : ""}`}
              onClick={() => {
                api?.scrollTo(index);
              }}
            >
              <img
                src={item.url}
                className="h-full w-full object-cover"
                alt={item.id}
              />
            </Button>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};

export default CarouselImage;
