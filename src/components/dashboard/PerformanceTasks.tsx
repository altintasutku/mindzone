import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CheckIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

const performanceTasks = [
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
];

const PerformanceTasks = () => {
  return (
    <section className="bg-white shadow p-4 text-center space-y-3">
      <h1 className="font-semibold text-xl">Performans Testleri</h1>
      <div className="flex flex-wrap justify-evenly gap-2">
        {performanceTasks.map((task, index) => (
          <Link 
            href={`/test/${index + 1}`}
            key={index}
            className={`flex flex-col items-center space-y-2 ${
              task.locked ? "opacity-50" : ""
            }`}
          >
            <div className="relative">
              <Progress value={task.progress} className="w-16 h-16" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold">{task.progress}%</span>
              </div>
            </div>
            <Button
              variant={"ghost"}
              className="text-xs space-x-1"
              disabled={task.locked}
            >
              {task.done ? <CheckIcon size={24} /> : <PlayIcon size={24} />}
              <span>{`Test ${index + 1}`}</span>
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PerformanceTasks;
