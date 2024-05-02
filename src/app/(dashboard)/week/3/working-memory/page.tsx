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
import { WeekData } from "@/lib/api/week";
import { useSendWeeklyData } from "@/hooks/useSendData";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_three/working_memory/${src}.jpg`;
};

const TOTAL_ROUNDS = 100;

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

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 11,
    group: "W1",
  });

  const [temp, setTemp] = useState<NodeJS.Timeout | null>(null);
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (timeout) {
        setTemp(timeout);
        clearInterval(timeout);
        setMyTimeout(null);
      }
    } else {
      if (!timeout && temp !== null) {
        setMyTimeout(
          setInterval(() => {
            setTimer((prev) => prev + 10);
          }, 10)
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
        false
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { send, isSending } = useSendWeeklyData();

  useEffect(() => {
    if (!isFinished) return;

    send(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    if (round === TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));

      setIsFinished(true);
      return;
    }
    setLevel(levels[round - 1]);

    const timeout = setTimeout(() => {
      setShownImages((prev) => prev.map(() => false));
    }, 3000);

    return () => clearTimeout(timeout);
  }, [round]);

  const handleNextRound = () => {
    if (round === levels.length) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));

      setIsFinished(true);
      return;
    }
    setRound((prev) => prev + 1);
    setShownImages((prev) => prev.map(() => true));

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
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
        setStats((prev) => ({
          ...prev,
          totalAccuracy: prev.totalAccuracy + 1,
        }));
        setIsCorrect(true);
      }, 1000);
    } else {
      timeout = setTimeout(() => {
        setStats((prev) => ({
          ...prev,
          totalErrorCount: prev.totalErrorCount + 1,
        }));
        setIsCorrect(false);
      }, 1000);
    }

    const secTimeout = setTimeout(() => {
      setIsCorrect(null);
      handleNextRound();
    }, 1500);

    return () => {
      clearTimeout(timeout);
      clearTimeout(secTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shownImages]);

  const handleClick = (index: number) => {
    if (shownImages.findIndex((item) => item === false) === -1) return;
    setShownImages((prev) =>
      prev.map((item, i) => (i === index ? !prev[i] : item))
    );
  };

  return (
    <div className="w-full">
      {isFinished ? (
        <div className="flex justify-center items-center">
          {<FinishScreen isSending={isSending} url="/week/3/cognitive-flexibility" />}
        </div>
      ) : round === 0 ? (
        <div className="flex flex-col items-center gap-10">
          <IntroductionWeekThreeGameOne />

          <Button onClick={handleNextRound}>Başla</Button>
        </div>
      ) : level ? (
        <div className="min-h-56 space-y-10 w-full">
          {isCorrect === true ? (
            <h1 className="text-2xl font-bold text-green-500 text-center col-span-4">
              Doğru
            </h1>
          ) : isCorrect === false ? (
            <h1 className="text-2xl font-bold text-red-500 text-center col-span-4">
              Yanlış
            </h1>
          ) : isCorrect === null ? (
            <div
              className={"grid grid-cols-2 sm:grid-cols-4 gap-4 items-center"}
            >
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
            value={(round * 100) / TOTAL_ROUNDS}
            className="col-span-4"
          />
        </div>
      ) : null}
    </div>
  );
};

export default WeekThreeGameOnePage;
