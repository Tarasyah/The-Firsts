"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Person } from "@/types";
import { Youtube } from "lucide-react";

type DetailModalProps = {
  person: Person | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function DetailModal({ person, isOpen, onClose }: DetailModalProps) {
  if (!person) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] bg-background">
        <DialogHeader>
          <DialogTitle className="font-headline text-4xl">{person.name}</DialogTitle>
          <DialogDescription className="text-accent font-semibold pt-1 text-lg">
            {person.title}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="font-bold text-foreground/90 mb-2">Reason behind the Title</h3>
            <p className="text-sm text-foreground/80">{person.reasonBehindTitle}</p>
          </div>
          <Separator />
          <div>
            <h3 className="font-bold text-foreground/90 mb-2">Lessons</h3>
            <p className="text-sm text-foreground/80 italic">"{person.lessons}"</p>
          </div>
          <Separator />
          <div>
            <h3 className="font-bold text-foreground/90 mb-2">Further Watching</h3>
            <div className="flex items-center gap-2 text-sm text-foreground/80">
                <Youtube className="w-5 h-5 text-accent"/>
                <span>{person.youtubeTitle}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
