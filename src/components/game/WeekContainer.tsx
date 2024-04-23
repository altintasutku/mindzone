"use client";

import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";
import { ZodUser } from "@/lib/validators/user";
import { getUser } from "@/lib/api/user";

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
  const session = useSession();

  const [user, setUser] = useState<ZodUser | null>(null);

  useEffect(() => {
    if (session.status !== "authenticated") {
      return;
    }

    const asyncUser = async () => {
      const data = await getUser({
        accessToken: session.data.user.accessToken,
        userId: session.data.user.id,
      });

      setUser(data);
    };
    asyncUser();
  }, [session]);

  if (session.status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 m-5 p-4 rounded-md shadow min-w-[50%] w-full sm:max-w-[80%] lg:max-w-[60%]">
        <div className="min-h-96 flex justify-center items-center">
          {children}
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap justify-evenly items-center gap-5">
          {!user && (
            <span>
              <Loader2Icon size={32} className="animate-spin" />
            </span>
          )}

          {user &&
            games.map((game, index) => {
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
