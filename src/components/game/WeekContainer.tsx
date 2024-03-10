"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { CheckIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = Readonly<{
  children: React.ReactNode;
  games: Game[];
}>;

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/previews/${src}.png`;
};

const WeekContainer = ({ children, games }: Props) => {
  const pathname = usePathname();

  const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 m-5 p-4 rounded-md shadow min-w-[50%] w-full sm:max-w-[80%] lg:max-w-[60%]">
        {children}
        <Separator className="my-4" />
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-center my-4 font-semibold">
              Hafta {games[0].week} Egzersizleri
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4">
              {games.map((game, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-4 items-center border border-slate-200 cursor-pointer min-h-12 rounded-xl overflow-hidden shadow text-lg font-semibold",
                    {
                      "bg-slate-100 dark:bg-slate-500": pathname.includes(game.slug),
                      "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200": game.isCompleted,
                    }
                  )}
                  onClick={() => {
                    router.push(`/week/${game.week}/${game.slug}`);
                  }}
                >
                  <div className="h-24 w-36 flex justify-center items-center border border-slate-200">
                    <Image
                      loader={imageLoader}
                      src={`week${games[0].week}_game${index + 1}`}
                      alt={game.slug}
                      width={150}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span>{index + 1}. Egzersiz </span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default WeekContainer;
