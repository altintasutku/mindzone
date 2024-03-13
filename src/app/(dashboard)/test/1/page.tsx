"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import React from "react";
import IntroductionsTestOne from "./_introductions";
import { Progress } from "@/components/ui/progress";

const imageColors = ["red", "green", "blue", "yellow"];
const imageShapes = ["Dots", "Triangles", "Crosses", "Stars"];

enum Rules {
  shape = "shape",
  color = "color",
  count = "count",
}

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/test_one_images/${src}.jpg`;
};

const answers = [
  {
    number: "1",
    color: "red",
    shape: "Dots",
  },
  {
    number: "2",
    color: "green",
    shape: "Triangles",
  },
  {
    number: "3",
    color: "blue",
    shape: "Crosses",
  },
  {
    number: "4",
    color: "yellow",
    shape: "Stars",
  },
];

const TOTAL_ROUNDS = 360;

const CORRECT_DURATION = 1000;

const PerformanceTestOnePage = () => {
  const { toast } = useToast();

  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  const correctToats = () => {
    setIsCorrect(true);
    setTimeout(() => {
      setIsCorrect(null);
      nextRound();
    }, CORRECT_DURATION);
  };

  const wrongToats = () => {
    setIsCorrect(false);
    setTimeout(() => {
      setIsCorrect(null);
      nextRound();
    }, CORRECT_DURATION);

    setStats((prev) => ({
      ...prev,
      totalWrongs: prev.totalWrongs + 1,
      resistanceWrongs:
        round % 10 === 2 ? prev.resistanceWrongs + 1 : prev.resistanceWrongs,
    }));
  };

  const [stats, setStats] = React.useState<{
    totalWrongs: number;
    resistanceWrongs: number;
  }>({
    totalWrongs: 0,
    resistanceWrongs: 0,
  });

  const [currentShape, setCurrentShape] = React.useState<{
    number: string;
    color: string;
    shape: string;
  }>();

  const [currentRule, setCurrentRule] = React.useState<Rules>(Rules.shape);

  const [round, setRound] = React.useState<number>(0);

  const [isFinished, setIsFinished] = React.useState<boolean>(false);

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      toast({
        title: "Test Finished",
        description: "You have finished the test.",
        variant: "success",
        duration: 2000,
      });
      setIsFinished(true);
      return;
    }

    if (round % 40 <= 10) setCurrentRule(Rules.shape);
    else if (round % 40 <= 20) setCurrentRule(Rules.color);
    else if (round % 40 <= 30) setCurrentRule(Rules.count);
    else setCurrentRule(Rules.shape);
    setRound((prev) => prev + 1);
    setCurrentShape(generateRandomImage());
  };

  const handleAnswer = (answerIndex: number) => {
    if (currentRule === Rules.shape) {
      if (answers[answerIndex].shape === currentShape?.shape) correctToats();
      else wrongToats();
    } else if (currentRule === Rules.color) {
      if (answers[answerIndex].color === currentShape?.color) correctToats();
      else wrongToats();
    } else if (currentRule === Rules.count) {
      if (answers[answerIndex].number === currentShape?.number) correctToats();
      else wrongToats();
    }
  };

  return (
    <div className="flex flex-col items-center py-10">
      {isFinished ? (
        <FinishScreen url="/test/2" />
      ) : round === 0 ? (
        <div className="flex flex-col">
          <IntroductionsTestOne />
          <Separator className="my-5" />

          <div className="flex justify-center my-5">
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <>
          {isCorrect === null && currentShape ? (
            <Image
              className="border border-stone-200 rounded-md"
              loader={imageLoader}
              src={`${currentShape.number}${currentShape.color}${currentShape.shape}`}
              alt="random"
              width={100}
              height={100}
            />
          ) : isCorrect === true ? (
            <div className="text-green-500 text-xl font-semibold w-[100px] h-[100px] flex justify-center items-center">
              Doğru
            </div>
          ) : isCorrect === false ? (
            <div className="text-red-500 text-xl font-semibold w-[100px] h-[100px] flex justify-center items-center">
              Yanlış
            </div>
          ) : null}
          <Separator className="my-5 opacity-50" />
          <small className="test-sm opacity-65 mb-2">Seçenekler</small>
          <div className="grid grid-cols-2 sm:flex gap-4">
            {answers.map((answer, index) => (
              <Image
                key={index}
                loader={imageLoader}
                className="border border-slate-400 rounded-md cursor-pointer hover:shadow-md hover:border-slate-700 transition duration-300 ease-in-out"
                src={`${answer.number}${answer.color}${answer.shape}`}
                alt={`${answer.number}${answer.color}${answer.shape}`}
                width={100}
                height={100}
                onClick={() => handleAnswer(index)}
              />
            ))}
          </div>
          <Progress className="mt-7" value={(100 * round) / TOTAL_ROUNDS} showValue/>
        </>
      )}
    </div>
  );
};

const generateRandomImage = () => {
  const randomNumber = (Math.floor(Math.random() * 4) + 1).toString();
  const randomShape = imageShapes[Math.floor(Math.random() * 4)];
  const randomColor = imageColors[Math.floor(Math.random() * 4)];
  return {
    number: randomNumber,
    color: randomColor,
    shape: randomShape,
  };
};

export default PerformanceTestOnePage;
