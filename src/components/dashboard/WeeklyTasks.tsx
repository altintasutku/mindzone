"use client";

import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { LockIcon } from "lucide-react";
import { weeks } from "@/assets/mockdata/weeks";
import WeeklyTasksImage from "./WeeklyTasksImage";
import { useRouter } from "next/navigation";

const WeeklyTasks = () => {
  const router = useRouter();

  return (
    <section className="bg-white shadow text-center pt-5 rounded-md bg-opacity-30 space-y-5">
      <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {weeks.map((week, index) => (
          <div
            key={index}
            className="cursor-pointer border overflow-hidden border-neutral-200 rounded-xl flex flex-col items-center gap-3 py-3 shadow-md hover:shadow-lg transition-all relative"
            onClick={() => {
              if (!week.locked && week.progress !== 100) {
                router.push((window.location.href = "/week/" + (index + 1)));
              }
            }}
          >
            <div className="flex w-full items-center justify-center">
              <Progress
                value={week.progress}
                className="w-full mx-5"
                indicatorColor={
                  week.progress === 100 ? "bg-green-700" : "bg-primary"
                }
                showValue
              />
            </div>
            <div className="flex items-center justify-center">
              <WeeklyTasksImage week={week} weekNumber={index + 1} />
            </div>
            <div className="flex w-full items-center justify-center">
              <span className="font-bold">Hafta {index + 1}</span>
            </div>
            <div className="flex w-full px-5">
              <>
                {week.locked ? (
                  <Button className="w-full" variant={"outline"}>
                    Kilitli
                  </Button>
                ) : week.progress === 100 ? (
                  <Button className="w-full bg-green-700 hover:bg-green-700">
                    Bitti
                  </Button>
                ) : (
                  <Button className="w-full">Devam Et</Button>
                )}
              </>
            </div>

            {week.locked && (
              <div className="absolute w-full h-full bg-black inset-0 opacity-60 flex justify-center items-center">
                <LockIcon size={64} className="text-yellow-500" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    // <section className="bg-white shadow p-4 text-center space-y-3">
    //   <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
    // </section>
  );
};

export default WeeklyTasks;
