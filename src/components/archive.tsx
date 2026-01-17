"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const categoriesData = [
    {
      "id": "forerunners",
      "title": "The Forerunners",
      "arabicTitle": "السَّابِقُونَ",
      "description": "The Firsts to Embrace The Call."
    },
    {
      "id": "trendsetters",
      "title": "The Trendsetters",
      "arabicTitle": "الْمُسْتَنُّونَ",
      "description": "Whoever Starts a Good Tradition..."
    },
    {
      "id": "strangers",
      "title": "The Strangers",
      "arabicTitle": "الْغُرَبَاءُ",
      "description": "Blessed are those who remain firm."
    },
    {
      "id": "revivers",
      "title": "The Revivers",
      "arabicTitle": "الْمُجَدِّدُونَ",
      "description": "Those who Restore the Forgotten Sunnah."
    },
    {
      "id": "distinguished",
      "title": "The Distinguished",
      "arabicTitle": "الْمُحْسِنُونَ",
      "description": "The Ones who Strive for Excellence."
    }
  ];

export default function CategoriesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {categoriesData.map((category) => (
          <CarouselItem key={category.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
            <div className="p-1">
              <Card className="bg-card/80 border-2 border-border h-48 flex flex-col justify-center cursor-pointer group hover:border-primary transition-colors">
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  <h3 className="font-headline text-xl text-foreground group-hover:text-primary transition-colors">{category.title}</h3>
                  <p className="font-arabic text-2xl text-accent mt-1">{category.arabicTitle}</p>
                  <p className="text-xs text-foreground/70 mt-3">{category.description}</p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
