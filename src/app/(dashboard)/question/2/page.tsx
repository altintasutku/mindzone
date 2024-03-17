"use client";

import { stepTwoQuestions } from "@/assets/mockdata/survey/questions";
import { Button } from "@/components/ui/button";
import { FrownIcon, LaughIcon, MehIcon, SmileIcon } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";

const options = [
  "Kesinlikle Katılıyorum",
  "Sıklıkla Katılıyorum",
  "Bazen Katılıyorum",
  "Kesinlikle Katılmıyorum",
];

const QuestionTestTwo = () => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const [pages, setPages] = React.useState(1);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl mb-10">Anket</h1>
      <ul className="flex flex-col gap-14">
        {stepTwoQuestions
          .slice((pages - 1) * 5, (pages - 1) * 5 + 5)
          .map((question, index) => (
            <li key={index} className="flex flex-col gap-4">
              <p className="text-center text-lg font-semibold">
                {question.title}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                {options.map((option, index) => (
                  <Button
                    variant={
                      answers[question.id.toString()] === option
                        ? "default"
                        : "secondary"
                    }
                    key={index}
                    onClick={() =>
                      handleAnswer(question.id.toString(), options[index])
                    }
                  >
                    {index === 0 ? (
                      <LaughIcon size={18} className="mr-2" />
                    ) : index === 1 ? (
                      <SmileIcon size={18} className="mr-2" />
                    ) : index === 2 ? (
                      <MehIcon size={18} className="mr-2" />
                    ) : (
                      <FrownIcon size={18} className="mr-2" />
                    )}
                    <small className="text-sm">{option}</small>
                  </Button>
                ))}
              </div>
            </li>
          ))}
      </ul>
      <Progress
        className="my-5 max-w-96"
        value={(Object.keys(answers).length * 100) / stepTwoQuestions.length}
      />

      <nav role="navigation" className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={pages === 1}
          onClick={() => setPages((prev) => prev - 1)}
        >
          Geri
        </Button>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={pages === 10}
          onClick={() => setPages((prev) => prev + 1)}
        >
          İleri
        </Button>
        <Button
          variant="default"
          onClick={() => {
            console.log(answers); //TODO: Send answers to the server
          }}
          disabled={Object.keys(answers).length !== stepTwoQuestions.length}
        >
          Tamamla
        </Button>
      </nav>
    </div>
  );
};

export default QuestionTestTwo;
