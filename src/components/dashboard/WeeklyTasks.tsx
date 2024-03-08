"use client";

import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CheckIcon, LockIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { weeks } from "@/assets/mockdata/weeks";
import Image from "next/image";
import WeeklyTasksImage from "./WeeklyTasksImage";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { useRouter } from "next/navigation";

const WeeklyTasks = () => {
  const router = useRouter();

  return (
    <section className="bg-white shadow text-center pt-5 rounded-md bg-opacity-30">
      <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {weeks.map((week, index) => (
          <div
            key={index}
            className="cursor-pointer"
            onClick={() => {
              if (!week.locked) {
                router.push((window.location.href = "/week/" + (index + 1)));
              }
            }}
          >
            <CardContainer>
              <CardBody className="border w-11/12 overflow-hidden border-neutral-400 rounded-xl flex flex-col items-center h-auto gap-3 py-3 shadow hover:shadow-lg transition-all">
                <CardItem className="flex w-full items-center justify-center">
                  <Progress value={week.progress} className="w-full mx-5" />
                </CardItem>
                <CardItem className="flex items-center justify-center">
                  <WeeklyTasksImage />
                </CardItem>
                <CardItem className="flex w-full items-center justify-center">
                  <span className="font-bold">Hafta {index + 1}</span>
                </CardItem>
                <CardItem className="flex w-full px-5">
                  <>
                    {week.locked ? (
                      <Button className="w-full" variant={"outline"}>
                        Kilitli
                      </Button>
                    ) : (
                      <Button className="w-full">Devam Et</Button>
                    )}
                  </>
                </CardItem>

                {week.locked && (
                  <div className="absolute w-full h-full bg-black inset-0 opacity-60 flex justify-center items-center">
                    <LockIcon size={64} className="text-yellow-500" />
                  </div>
                )}
              </CardBody>
            </CardContainer>
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
