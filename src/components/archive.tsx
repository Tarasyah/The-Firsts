"use client";

import { useState } from "react";
import type { Person } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DetailModal from "@/components/detail-modal";
import Marquee from "@/components/marquee";

import forerunners from "@/lib/data/forerunners.json";
import trendsetters from "@/lib/data/trendsetters.json";
import strangers from "@/lib/data/strangers.json";
import revivers from "@/lib/data/revivers.json";
import distinguished from "@/lib/data/distinguished.json";

const allData = [
  { title: "The Forerunners", data: forerunners, direction: "left" as const },
  { title: "The Trendsetters", data: trendsetters, direction: "right" as const },
  { title: "The Strangers", data: strangers, direction: "left" as const },
  { title: "The Revivers", data: revivers, direction: "right" as const },
  { title: "The Distinguished", data: distinguished, direction: "left" as const },
];

export default function Archive() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  return (
    <section className="py-12 md:py-20 space-y-8">
      {allData.map((marqueeData) => (
        <div key={marqueeData.title} className="space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl text-center">{marqueeData.title}</h2>
          <Marquee direction={marqueeData.direction}>
            {marqueeData.data.map((person) => (
              <Card
                key={person.id}
                onClick={() => setSelectedPerson(person)}
                className="w-80 mx-4 flex-shrink-0 cursor-pointer transition-transform hover:-translate-y-2 hover:shadow-2xl bg-card border-2"
              >
                <CardHeader>
                  <CardTitle className="font-body font-bold">{person.name}</CardTitle>
                  <CardDescription className="text-accent font-semibold">{person.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/80 line-clamp-4">{person.livesSummary}</p>
                </CardContent>
              </Card>
            ))}
          </Marquee>
        </div>
      ))}
      <DetailModal
        person={selectedPerson}
        isOpen={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
      />
    </section>
  );
}
