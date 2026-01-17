import Image from "next/image";
import { Quote, Sparkles, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <header className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <div className="bg-secondary text-secondary-foreground rounded-2xl shadow-lg p-6 flex flex-col justify-between aspect-[4/3] md:aspect-square">
          <h2 className="font-headline text-xl md:text-2xl">ABOUT</h2>
          <div className="flex justify-between items-end text-secondary-foreground/50">
            <Quote
              className="w-10 h-10 md:w-12 md:h-12 transform -scale-x-100"
              fill="currentColor"
            />
            <Quote
              className="w-10 h-10 md:w-12 md:h-12"
              fill="currentColor"
            />
          </div>
        </div>

        <div className="bg-accent text-accent-foreground rounded-2xl shadow-lg p-6 flex flex-col justify-between aspect-[4/3] md:aspect-square">
          <h2 className="font-headline text-xl md:text-2xl">SHOWREEL</h2>
          <div className="flex justify-end">
            <Sparkles className="w-10 h-10 md:w-12 md:h-12 text-accent-foreground/80" />
          </div>
        </div>

        <div className="md:col-span-2 bg-primary text-primary-foreground rounded-2xl shadow-lg p-8 flex flex-col justify-center aspect-[2/1] md:aspect-auto">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl">
            The Firsts
          </h1>
          <p className="max-w-md text-base md:text-lg text-primary-foreground/80 mt-2">
            An interactive exploration of the trailblazers in Islamic history.
          </p>
        </div>

        <div className="relative md:col-span-2 rounded-2xl shadow-lg overflow-hidden group aspect-[2/1]">
          <Image
            src="https://picsum.photos/seed/hero1/800/400"
            alt="The Trendsetters"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="water waves"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="font-headline text-3xl">The Trendsetters</h2>
            <div className="flex items-center gap-2 mt-2 cursor-pointer">
              <p className="text-white/80">
                Whoever starts a good tradition...
              </p>
              <div className="bg-white/20 rounded-full p-1">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden group aspect-square">
          <Image
            src="https://picsum.photos/seed/hero2/400/400"
            alt="Placeholder image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="night street"
          />
        </div>

        <div className="relative rounded-2xl shadow-lg overflow-hidden group aspect-square">
          <Image
            src="https://picsum.photos/seed/hero3/400/400"
            alt="Placeholder image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="sunset bush"
          />
        </div>
      </div>
    </header>
  );
}
