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
import { getStories } from "@/lib/contract";
import { Skeleton } from "@/components/ui/skeleton";
function Stories() {
  const images = [
    "/images/stories/1.jpg",
    "/images/stories/2.jpg",
    "/images/stories/3.jpg",
    "/images/stories/4.jpg",
    "/images/stories/5.jpg",
  ];

  const [stories, setStories] = React.useState<string[]>([]);

  React.useEffect(() => {
    getStories().then((stories: any) => {
      setStories(stories.map((story: any) => `/api/image?id=${story.image}`));
      console.log(stories);
    });
  }, []);

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
          {stories.map((imageSrc, index) => (
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

          {stories.length === 0 && (
            <>
              <Skeleton className="h-[225px] w-[220px] mr-3 " />
              <Skeleton className="h-[225px] w-[220px]  mr-3" />
              <Skeleton className="h-[225px] w-[220px]  mr-3" />
              <Skeleton className="h-[225px] w-[220px]  mr-3" />
            </>
          )}
        </CarouselContent>
        {/* <CarouselPrevious />
            <CarouselNext /> */}
      </Carousel>
    </>
  );
}

export default Stories;
