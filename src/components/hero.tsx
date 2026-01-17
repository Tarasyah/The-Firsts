import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <header className="p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-auto gap-6 max-w-7xl mx-auto h-auto md:h-[60vh] min-h-[500px]">
        
        <div className="md:col-span-2 lg:col-span-3 row-span-2 bg-primary text-primary-foreground rounded-xl shadow-lg p-8 flex flex-col justify-between">
          <div>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl">The Firsts</h1>
          </div>
          <p className="max-w-md text-base md:text-lg text-primary-foreground/80">
            An interactive archive celebrating the pioneers, innovators, and rebels who dared to be first.
          </p>
        </div>

        <div className="bg-background rounded-xl shadow-lg p-6 flex flex-col justify-between items-start">
          <h2 className="font-headline text-2xl text-foreground/80">About</h2>
          <Button variant="link" className="p-0 h-auto text-accent-foreground/90 hover:text-accent">
            Read More <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="bg-secondary hidden lg:block rounded-xl shadow-lg"></div>

        <div className="md:col-span-2 bg-accent/80 rounded-xl shadow-lg p-6 flex flex-col justify-end">
          <h2 className="font-headline text-3xl text-accent-foreground">Showreel</h2>
          <p className="text-accent-foreground/80">A visual journey through history's milestones.</p>
        </div>
      </div>
    </header>
  );
}
