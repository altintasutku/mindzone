"use client";

import { performanceTestFiveQuestions } from "@/assets/mockdata/performaceTests/performanceTestFive";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IntroductionTestFive from "./_introductions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FinishScreen from "@/components/game/FinishScreen";

const TOTAL_ROUNDS = performanceTestFiveQuestions.length;

const loader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/eyes/${src}.png`;
};

const DURATION = 600;

const Page = () => {
  const [round, setRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<TestFiveQuestion>();

  const [isFinished, setIsFinished] = useState(false);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [isTutorial, setIsTutorial] = useState(true);

  useEffect(() => {
    setCurrentQuestion(performanceTestFiveQuestions[round - 1]);
  }, [round]);

  const handleNext = () => {
    if (round >= TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }
    setRound((prev) => prev + 1);
  };

  const handleAnswer = (answer: number) => {
    if (currentQuestion?.correctAnswer === answer) {
      setIsCorrect(true);
    } else if (isTutorial) {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, DURATION);
      return;
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      handleNext();
      setIsCorrect(null);
    }, DURATION);
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen url="/question/2" />
      ) : round === 0 ? (
        <div className="flex flex-col items-center">
          <IntroductionTestFive />
          <Button className="my-5 w-24" onClick={handleNext}>
            Başla
          </Button>
        </div>
      ) : isTutorial && round == 2 ? (
        <div className="flex flex-col items-center">
          <p>Tebrikler deneme bitti! Şimdi devam edelim</p>
          <Button className="my-5 w-24" onClick={() => setIsTutorial(false)}>
            Devam
          </Button>
        </div>
      ) : currentQuestion ? (
        <div className="grid grid-cols-4">
          <Button
            disabled={isCorrect !== null}
            onClick={() => handleAnswer(0)}
            variant={"ghost"}
            className="text-wrap"
          >
            {currentQuestion.answers[0]}
          </Button>
          <div className="col-span-2"></div>
          <Button
            disabled={isCorrect !== null}
            onClick={() => handleAnswer(1)}
            variant={"ghost"}
            className="text-wrap"
          >
            {currentQuestion.answers[1]}
          </Button>

          <div></div>
          <div className="relative col-span-2">
            {isCorrect === null ? (
              <></>
            ) : isCorrect ? (
              <div className="absolute inset-0 text-xl font-semibold flex justify-center items-center text-green-500">
                Doğru
              </div>
            ) : (
              <div className="absolute inset-0 text-xl font-semibold flex justify-center items-center text-red-500">
                Yanlış
              </div>
            )}
            <Image
              loader={loader}
              src={currentQuestion.path}
              alt="testFiveImage"
              className={cn("w-full rounded-md", {
                "opacity-0": isCorrect !== null,
              })}
              height={300}
              width={300}
            />
          </div>
          <div></div>

          <Button
            disabled={isCorrect !== null}
            onClick={() => handleAnswer(2)}
            variant={"ghost"}
            className="text-wrap"
          >
            {currentQuestion.answers[2]}
          </Button>
          <div className="col-span-2"></div>
          <Button
            disabled={isCorrect !== null}
            onClick={() => handleAnswer(3)}
            variant={"ghost"}
            className="text-wrap"
          >
            {currentQuestion.answers[3]}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Page;
