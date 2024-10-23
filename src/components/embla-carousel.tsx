import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "@/components/embla-carousel-thumbs-button";
import Image from "next/image";
import { Product } from "@/types/product.type";

type PropType = {
  product: Product;
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { product, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    emblaMainApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <div className="embla w-[400px]">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {product?.extra_images?.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <Image
                  src={item.url}
                  alt="Product Image"
                  width={300}
                  height={300}
                  className="h-[300px] rounded-xl"
                />
              </div>
            </div>
          ))}
          <div className="embla__slide">
            <div className="embla__slide__number">
              <Image
                src={product?.url}
                alt="Product Image"
                width={300}
                height={300}
                className="h-[300px] rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="embla-thumbs">
        <div ref={emblaThumbsRef}>
          <div className="embla-thumbs__container justify-center">
            {product?.extra_images?.map((item, index) => (
              <Thumb
                key={index}
                onClick={() => onThumbClick(index)}
                selected={index === selectedIndex}
                index={index}
                image={item}
              />
            ))}
            <Thumb
              onClick={() => onThumbClick(99)}
              selected={99 === selectedIndex}
              index={99}
              image={{ id: product.id, url: product.url }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
