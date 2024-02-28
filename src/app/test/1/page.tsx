"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import React from "react";
import IntroductionsTestOne from "./_introductions";

const imageColors = ["red", "green", "blue", "yellow"];
const imageShapes = ["Dots", "Triangles", "Crosses", "Stars"];

enum Rules {
  shape = "shape",
  color = "color",
  count = "count",
}

const myLoader = ({ src }: { src: string }) => {
  return `http://localhost:3000/images/test_one_images/${src}.jpg`;
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

const PerformanceTestOnePage = () => {
  const { toast } = useToast();

  const correctToats = () => {
    toast({
      title: "Correct Answer",
      description: "You have answered correctly.",
      variant: "success",
      duration: 2000,
    });
  };

  const wrongToats = () => {
    toast({
      title: "Wrong Answer",
      description: "You have answered wrong.",
      variant: "destructive",
      duration: 2000,
    });

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
    if (round >= 100) {
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

    nextRound();
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
          {currentShape && (
            <Image
              className="border border-stone-200 rounded-md"
              loader={myLoader}
              src={`${currentShape.number}${currentShape.color}${currentShape.shape}`}
              alt="random"
              width={100}
              height={100}
            />
          )}
          <Separator className="my-5 opacity-50" />
          <small className="test-sm opacity-65 mb-2">Seçenekler</small>
          <div className="flex gap-4">
            {answers.map((answer, index) => (
              <Image
                key={index}
                loader={myLoader}
                className="border border-slate-400 rounded-md cursor-pointer hover:shadow-md hover:border-slate-700 transition duration-300 ease-in-out"
                src={`${answer.number}${answer.color}${answer.shape}`}
                alt={`${answer.number}${answer.color}${answer.shape}`}
                width={100}
                height={100}
                onClick={() => handleAnswer(index)}
              />
            ))}
          </div>
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
