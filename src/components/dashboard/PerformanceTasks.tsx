import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { CheckIcon, LockIcon, PlayIcon } from "lucide-react";
import Link from "next/link";
import { performanceTasksProgress } from "@/assets/mockdata/performanceTasksProgress";

const PerformanceTasks = () => {
  return (
    <section className="bg-white shadow p-4 text-center space-y-3 rounded-md">
      <h1 className="font-semibold text-xl">Performans Testleri</h1>
      <div className="flex flex-wrap justify-evenly gap-2">
        {performanceTasksProgress.map((task, index) => (
          <Button variant={"ghost"} key={index} asChild>
            <Link href={`/test/${index + 1}`}>
              {task.done ? (
                <CheckIcon size={22} />
              ) : !task.locked ? (
                <PlayIcon size={22} />
              ) : (
                <LockIcon size={22} />
              )}
              <span>{`Test ${index + 1}`}</span>
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
};

export default PerformanceTasks;
