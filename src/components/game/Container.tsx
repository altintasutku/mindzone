"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { CheckIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  children: React.ReactNode;
  games: Game[];
}>;

const Container = ({ children, games }: Props) => {
  const pathname = usePathname();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white m-5 p-4 rounded-md shadow">
        {children}
        <Separator className="my-4" />
        <h2 className="text-center my-4 font-semibold">
          Hafta {games[0].week} oyunları
        </h2>
        <div className="flex gap-3 flex-wrap justify-center">
          {games.map((game, index) =>
            game.isCompleted ? (
              <Button
                key={index}
                className="p-3 rounded-md shadow"
                disabled
                variant={"ghost"}
              >
                <CheckIcon size={18} className="mr-2" />
                {game.title}
              </Button>
            ) : (
              <Button
                key={index}
                className="p-3 rounded-md shadow"
                variant={pathname.includes(game.slug) ? "default" : "outline"}
                asChild
              >
                <Link href={`/week/${game.week}/${game.slug}`}>
                  {game.title}
                </Link>
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Container;
