import { cn } from "@/lib/utils";
import React from "react";

type MarqueeProps = {
  children: React.ReactNode;
  direction?: "left" | "right";
  className?: string;
};

export default function Marquee({
  children,
  direction = "left",
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden p-4 --gap-4",
        className
      )}
    >
      <div
        className={cn("flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)]", {
          "animate-marquee-left": direction === "left",
          "animate-marquee-right": direction === "right",
        }, "group-hover:paused")}
      >
        {children}
      </div>
       <div
        aria-hidden="true"
        className={cn("flex min-w-full shrink-0 items-center justify-around gap-[var(--gap)]", {
          "animate-marquee-left": direction === "left",
          "animate-marquee-right": direction === "right",
        }, "group-hover:paused")}
      >
        {children}
      </div>
    </div>
  );
}
