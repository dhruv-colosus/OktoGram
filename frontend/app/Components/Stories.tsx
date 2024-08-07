"use client";
import { Card, CardContent } from "@/components/ui/card";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
function Stories() {
  const images = [
    "/images/stories/1.jpg",
    "/images/stories/2.jpg",
    "/images/stories/3.jpg",
    "/images/stories/4.jpg",
    "/images/stories/5.jpg",
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className="w-full max-w-full"
      >
        <CarouselContent className="-ml-4">
          {images.map((imageSrc, index) => (
            <CarouselItem
              key={index}
              className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <div className="p-1">
                <Card className="h-[200px] w-full overflow-hidden">
                  <CardContent className="p-0">
                    <img
                      src={imageSrc}
                      alt={`Carousel image ${index + 1}`}
                      className=" h-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
            <CarouselNext /> */}
      </Carousel>
    </>
  );
}

export default Stories;
