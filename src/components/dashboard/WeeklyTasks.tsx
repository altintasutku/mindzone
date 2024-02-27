import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CheckIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

const weeks = [
  {
    done: true,
    locked: false,
    progress: 100,
  },
  {
    done: true,
    locked: false,
    progress: 100,
  },
  {
    done: false,
    locked: false,
    progress: 20,
  },
  {
    done: false,
    locked: true,
    progress: 0,
  },
  {
    done: false,
    locked: true,
    progress: 0,
  },
  {
    done: false,
    locked: true,
    progress: 0,
  },
];

const WeeklyTasks = () => {
  return (
    <section className="bg-white shadow p-4 text-center space-y-3">
      <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {weeks.map((week, index) => (
          <li
            className="col-span-1 bg-white shadow p-4 rounded-md"
            key={`week${index}`}
          >
            <div>Hafta {index + 1}</div>
            <div className="flex items-center gap-4">
              <div>{week.done ? "✅" : week.locked ? "🔒" : "🔵"}</div>
              <div className="flex flex-col flex-1">
                <Progress value={week.progress} />
              </div>
              <Link href={`/week/${index + 1}`}>
                <Button
                  variant={week.done ? "secondary" : "default"}
                  disabled={week.done || week.locked}
                >
                  {week.done ? (
                    <span className="flex items-center gap-1">
                      <CheckIcon size={16} />
                    </span>
                  ) : week.progress === 0 ? (
                    <span className="flex items-center gap-1">
                      <PlayIcon size={16} />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      Devam Et
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default WeeklyTasks;
