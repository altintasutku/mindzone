"use client";

import { stepOneQuestions } from "@/assets/mockdata/questions";
import { Button } from "@/components/ui/button";
import {
  CheckCheckIcon,
  CheckIcon,
  ChevronsDownIcon,
  ChevronsLeftRightIcon,
  FrownIcon,
  LaughIcon,
  MehIcon,
  SmileIcon,
} from "lucide-react";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

const options = [
  "Kesinlikle Katılıyorum",
  "Sıklıkla Katılıyorum",
  "Bazen Katılıyorum",
  "Kesinlikle Katılmıyorum",
];

const QuestionTestOne = () => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const [pages, setPages] = React.useState(1);

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl mb-10">Anket</h1>
      <ul className="flex flex-col gap-14">
        {stepOneQuestions
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
                      <SmileIcon  size={18} className="mr-2"/>
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
      <Pagination className="mt-10">
        <PaginationContent className=" flex-wrap">
          <PaginationItem>
            <Button
              variant="secondary"
              disabled={pages === 1}
              onClick={() => setPages((prev) => prev - 1)}
            >
              Geri
            </Button>
          </PaginationItem>

          {pages < 3 ? (
            <>
              {Array.from({ length: 3 }, (_, index) => (
                <PaginationItem key={index}>
                  <Button
                    onClick={() => setPages(index + 1)}
                    variant={pages === index + 1 ? "default" : "secondary"}
                  >
                    {index + 1}
                  </Button>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          ) : pages > 8 ? (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {Array.from({ length: 3 }, (_, index) => (
                <PaginationItem key={index}>
                  <Button
                    onClick={() => setPages(index + 8)}
                    variant={pages === index + 8 ? "default" : "secondary"}
                  >
                    {index + 8}
                  </Button>
                </PaginationItem>
              ))}
            </>
          ) : (
            <>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              {Array.from({ length: 3 }, (_, index) => (
                <PaginationItem key={index}>
                  <Button
                    onClick={() => setPages(pages + index - 1)}
                    variant={
                      pages === pages + index - 1 ? "default" : "secondary"
                    }
                  >
                    {pages + index - 1}
                  </Button>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            </>
          )}

          <PaginationItem>
            <Button
              variant="secondary"
              disabled={pages === 10}
              onClick={() => setPages((prev) => prev + 1)}
            >
              İleri
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <div className="flex justify-end w-full py-10">
        <Button
          variant="default"
          onClick={() => {
            console.log(answers);
          }}
          disabled={Object.keys(answers).length !== stepOneQuestions.length}
        >
          Tamamla
        </Button>
      </div>
    </div>
  );
};

export default QuestionTestOne;
