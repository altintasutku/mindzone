import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CheckIcon, LockIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { weeks } from "@/assets/mockdata/weeks";
import Image from "next/image";
import WeeklyTasksImage from "./WeeklyTasksImage";

const WeeklyTasks = () => {
  return (
    <section className="bg-white shadow p-4 text-center space-y-3">
      <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {weeks.map((week, index) => (
          <li
            className="col-span-1 bg-white shadow p-4 rounded-md space-y-5"
            key={`week${index}`}
          >
            <div className="flex justify-center">
              <WeeklyTasksImage />
            </div>
            <div>Hafta {index + 1}</div>
            <div className="flex items-center gap-4">
              <div>{week.done ? "✅" : week.locked ? "🔒" : "🔵"}</div>
              <div className="flex flex-col flex-1">
                <Progress value={week.progress} />
              </div>
              {week.locked ? (
                <Button variant={"default"} disabled>
                  <LockIcon size={16} />
                </Button>
              ) : week.done ? (
                <Button variant={"secondary"} disabled>
                  <CheckIcon size={16} />
                </Button>
              ) : (
                <Link href={`/week/${index + 1}`}>
                  <Button variant={"default"}>Devam Et</Button>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeeklyTasks;
