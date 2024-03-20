import React from "react";
import { Progress } from "../ui/progress";
import { Button, buttonVariants } from "../ui/button";
import { LockIcon } from "lucide-react";
import { weeks } from "@/assets/mockdata/progresses/weeks";
import WeeklyTasksImage from "./WeeklyTasksImage";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const WeeklyTasks = async () => {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  let user;
  try {
    user = await getUser({
      accessToken: session.user.accessToken!,
      userId: session.user.id!,
    });
  } catch (e) {
    redirect("/auth/logout");
  }

  return (
    <section className="dark:bg-zinc-900 shadow text-center pt-5 rounded-md space-y-5">
      <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-4">
        {weeks.map((week, index) => {
          const notCeiled = parseInt(user.userDetails.WeeklyStatus) / 5;

          const weekNumber = Math.ceil(notCeiled);

          const progress =
            weekNumber === index + 1
              ? (parseInt(user.userDetails.WeeklyStatus) - 1) % 5 * 20
              : weekNumber > index + 1
              ? 100
              : -1;

          return (
            <div
              key={index}
              className="cursor-pointer border overflow-hidden border-neutral-200 dark:border-neutral-600 rounded-xl flex flex-col items-center gap-3 py-3 shadow-md hover:shadow-lg transition-all relative"
            >
              <div className="flex w-full items-center justify-center">
                <Progress
                  value={progress}
                  className="w-full mx-5"
                  indicatorColor={
                    progress === 100 ? "bg-green-700" : "bg-primary"
                  }
                  showValue
                />
              </div>
              <div className="flex items-center justify-center">
                <WeeklyTasksImage week={week} weekNumber={index + 1} />
              </div>
              <div className="flex w-full items-center justify-center">
                <span className="font-bold">{index + 1}. Hafta</span>
              </div>
              <div className="flex w-full px-5">
                <>
                  {progress === -1 ? (
                    <Button className="w-full" variant={"outline"}>
                      Kilitli
                    </Button>
                  ) : progress === 100 ? (
                    <Button className="w-full bg-green-700 hover:bg-green-700">
                      Bitti
                    </Button>
                  ) : (
                    <Link
                      href={"/week/" + (index + 1)}
                      className={cn("w-full", buttonVariants())}
                    >
                      Devam Et
                    </Link>
                  )}
                </>
              </div>

              {progress === -1 && (
                <div className="absolute w-full h-full bg-black/40 backdrop-blur-sm z-40 inset-0 flex justify-center items-center">
                  <LockIcon size={64} className="text-yellow-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklyTasks;
