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
import { useUserStore } from "@/hooks/useUserStore";

type Props = Readonly<{
  children: React.ReactNode;
  games: Game[];
}>;

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/previews/${src}.png`;
};

const WeekContainer = ({ children, games }: Props) => {
  const user = useUserStore((state) => state.user);

  const pathname = usePathname();
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 m-5 p-4 rounded-md shadow min-w-[50%] w-full sm:max-w-[80%] lg:max-w-[60%]">
        {children}
        <Separator className="my-4" />
        <div className="flex flex-wrap justify-evenly items-center gap-5">
          {games.map((game, index) => {
            const isCompleted =
              (parseInt(user.userDetails.WeeklyStatus) - 1) % 5 > index;

            return (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-1 p-1 items-center border border-slate-200 cursor-pointer rounded-xl overflow-hidden shadow text-lg font-semibold",
                  {
                    "bg-slate-100 dark:bg-slate-500": pathname.includes(
                      game.slug
                    ),
                    "bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200":
                      isCompleted,
                  }
                )}
                onClick={() => {
                  if (!isCompleted) {
                    router.push(`/week/${game.week}/${game.slug}`);
                  }
                }}
              >
                <div className="h-36 w-36 aspect-square rounded-xl overflow-hidden flex justify-center items-center border border-slate-200">
                  <Image
                    loader={imageLoader}
                    src={`week${games[0].week}_game${index + 1}`}
                    alt={game.slug}
                    width={150}
                    height={40}
                    className={cn("h-full w-full object-cover", {
                      "opacity-50": isCompleted,
                    })}
                  />
                </div>
                <span>{index + 1}. Egzersiz </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekContainer;
