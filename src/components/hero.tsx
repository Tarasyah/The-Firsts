import { Quote, Sparkles } from "lucide-react";
import CategoriesCarousel from "@/components/archive";

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
        
        <div className="md:col-span-4 mt-2">
          <CategoriesCarousel />
        </div>

      </div>
    </header>
  );
}
