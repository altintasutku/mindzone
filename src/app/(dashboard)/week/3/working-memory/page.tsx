"use client";

import {
  levels,
  type GameImage,
} from "@/assets/mockdata/weekGames/week3game1data";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IntroductionWeekThreeGameOne from "./_introductions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import FinishScreen from "@/components/game/FinishScreen";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_three/working_memory/${src}.jpg`;
};

const WeekThreeGameOnePage = () => {
  const [level, setLevel] = useState<GameImage[]>();
  const [round, setRound] = useState(0);

  const [shownImages, setShownImages] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (round === levels.length) {
      setIsFinished(true);
      return;
    }
    setLevel(levels[round - 1]);

    const timeout = setTimeout(() => {
      setShownImages((prev) => prev.map(() => false));
    }, 5000);

    return () => clearTimeout(timeout);
  }, [round]);

  const handleNextRound = () => {
    if (round === levels.length) {
      return;
    }
    setRound((prev) => prev + 1);
    setShownImages((prev) => prev.map(() => true));
  };

  useEffect(() => {
    if (!level) {
      return;
    }

    let showns: number[] = [];
    shownImages.forEach((item, index) => {
      if (item) {
        showns.push(index);
      }
    });

    if (showns.length !== shownImages.length / 2) {
      return;
    }

    let timeout: NodeJS.Timeout;
    if (level[showns[0]].mod === level[showns[1]].mod) {
      timeout = setTimeout(() => {
        setIsCorrect(true);
      }, 1000);
    } else {
      timeout = setTimeout(() => {
        setIsCorrect(false);
      }, 1000);
    }

    const secTimeout = (timeout = setTimeout(() => {
      setIsCorrect(null);
      handleNextRound();
    }, 2000));

    return () => {
      clearTimeout(timeout);
      clearTimeout(secTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownImages]);

  const handleClick = (index: number) => {
    setShownImages((prev) =>
      prev.map((item, i) => (i === index ? !prev[i] : item))
    );
  };

  return (
    <div>
      {isFinished ? (
        <div className="flex justify-center items-center">
          <FinishScreen url="/week/3/cognitive-flexibility" />
        </div>
      ) : round === 0 ? (
        <div className="flex flex-col items-center gap-10">
          <IntroductionWeekThreeGameOne />

          <Button onClick={handleNextRound}>Başla</Button>
        </div>
      ) : level ? (
        <div className="min-h-56 space-y-10">
          {isCorrect === true ? (
            <h1 className="text-2xl font-bold text-green-500 text-center col-span-4">
              Doğru
            </h1>
          ) : isCorrect === false ? (
            <h1 className="text-2xl font-bold text-red-500 text-center col-span-4">
              Yanlış
            </h1>
          ) : isCorrect === null ? (
            <div className={"grid grid-cols-2 sm:grid-cols-4 gap-4 items-center"}>
              {level.map((item, index) => (
                <div
                  key={index}
                  className="bg-primary rounded-md overflow-hidden cursor-pointer"
                  onClick={() => handleClick(index)}
                >
                  <Image
                    loader={imageLoader}
                    src={`${item.mod}/${item.sex}/${item.index}`}
                    alt={item.mod}
                    width={200}
                    height={200}
                    draggable={false}
                    className={cn("transition-all duration-1000", {
                      "rotate-y-180 opacity-0": !shownImages[index],
                    })}
                  />
                </div>
              ))}
            </div>
          ) : null}

          <Progress
            value={(round * 100) / levels.length}
            className="col-span-4"
          />
        </div>
      ) : null}
    </div>
  );
};

export default WeekThreeGameOnePage;
