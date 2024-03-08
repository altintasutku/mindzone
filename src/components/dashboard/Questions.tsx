import React from "react";
import { Progress } from "../ui/progress";
import Link from "next/link";
import { questionProgressList } from "@/assets/mockdata/questionProgress";

const Questions = () => {
  return (
    <section className="bg-white shadow p-4 text-center space-y-3 rounded-md bg-opacity-30">
      <h1 className="font-semibold text-xl">Anketler</h1>
      <ul className="flex flex-col sm:flex-row gap-3">
        {questionProgressList.map((question, index) => (
          <Link
            href={`/question/${index + 1}`}
            className="bg-white shadow p-4 rounded-md flex-1 cursor-pointer hover:bg-gray-100 transition-colors duration-200 ease-in-out"
            key={`question${index}`}
          >
            <div>Anket {index + 1}</div>
            <div className="flex items-center gap-4">
              <div>{question.done ? "✅" : question.locked ? "🔒" : "🔵"}</div>
              <div className="flex flex-col flex-1">
                <Progress value={question.progress} />
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </section>
  );
};

export default Questions;
