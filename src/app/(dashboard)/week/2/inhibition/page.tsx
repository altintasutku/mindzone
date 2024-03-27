"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import WeekTwoGameThreeIntroduction from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";

const mods = { negative: 40, positive: 16 };

type DataType = {
  index: number;
  type: "negative" | "positive";
};

const allData: DataType[] = [
  ...Array.from({ length: mods.negative }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "negative",
    })
  ),
  ...Array.from({ length: mods.positive }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "positive",
    })
  ),
].sort(() => Math.random() - 0.5);

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/inhibition/${src}.JPG`;
};

const TOTAL_ROUNDS = mods.negative + mods.positive;

const MIN_REACTION_TIME = 1000;
const MAX_REACTION_TIME = 1200;

const WeekTwoGameThreePage = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [currentData, setCurrentData] = useState<DataType | null>(null);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }

    if (currentData === null) {
      setRound((prev) => prev + 1);
      setCurrentData(allData[round - 1]);
    } else setCurrentData(null);
  };

  useEffect(() => {
    if (round === 0 || isFinished) return;

    const timer = setTimeout(
      () => {
        nextRound();
      },
      currentData === null
        ? 500
        : Math.random() * (MAX_REACTION_TIME - MIN_REACTION_TIME) +
            MIN_REACTION_TIME
    );

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const handleClick = () => {
    if (currentData?.type === "positive") {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
    }, 1000);
  };

  return (
    <div>
      {isFinished ? (
        <div className="flex justify-center items-center">
          <FinishScreen url="/week/2/cognitive-emphaty" />
        </div>
      ) : round === 0 ? (
        <div className="flex flex-col">
          <WeekTwoGameThreeIntroduction />
          <Separator className="my-5" />

          <div className="flex justify-center my-5">
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex justify-center items-center min-h-72">
            {currentData ? (
              <Image
                loader={imageLoader}
                src={`${currentData.type}/${currentData.index}`}
                width={300}
                height={100}
                className="object-contain h-72 w-auto rounded-md"
                alt="inhibition"
              />
            ) : null}
          </div>
          <Separator className="my-5" />
          <div className="flex justify-center my-5">
            <Button
              className={cn("w-full md:w-48", {
                "bg-green-500 hover:bg-green-500": isCorrect === true,
                "bg-red-500 hover:bg-red-500": isCorrect === false,
              })}
              onClick={handleClick}
            >
              GİT
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekTwoGameThreePage;
