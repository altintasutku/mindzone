"use client";

import React, { useEffect, useState } from "react";
import DirectorTaskIntroductions from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import FinishScreen from "@/components/game/FinishScreen";
import { levels } from "@/assets/mockdata/week1DirectorGame";

const boxImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
};

const directorImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
};

const itemImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
};

const TOTAL_ROUNDS = levels.length;

const WeekOneDirectorTaskPage = () => {
  const [level, setLevel] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  const [currentLevel, setCurrentLevel] = useState(levels[level]);

  useEffect(() => {
    if (level === 0) return;
    setCurrentLevel(levels[level - 1]);
  }, [level]);

  const handleNextRound = () => {
    if (level === TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }

    setLevel((prev) => prev + 1);
  };

  const handleCellClick = (row: number, col: number) => {
    if (col === levels[level - 1].answer[0] && row === levels[level - 1].answer[1]) {
      console.log("Doğru");
    } else {
      console.log("Yanlış");
    }
    handleNextRound();
  };

  return (
    <div className="flex flex-col items-center gap-7">
      {isFinished ? (
        <FinishScreen url="/week/1/affective-empathy" />
      ) : level === 0 ? (
        <>
          <DirectorTaskIntroductions />

          <Separator />

          <Button onClick={handleNextRound}>Başla</Button>
        </>
      ) : (
        <div className="space-y-10 sm:my-10">
          <div className="flex flex-col-reverse sm:flex-row sm:gap-5 items-end sm:items-start">
            <div className="flex flex-col items-center my-20">
              {currentLevel.gameMap.map((row, j) => (
                <div key={j + "j"} className="flex">
                  {row.map((gameNode, k) => (
                    <div
                      key={k + "k"}
                      className={cn(
                        "flex flex-col items-center justify-center relative group cursor-pointer",
                        {
                          "z-30": j === 0,
                          "z-20": j === 1,
                          "z-10": j === 2,
                          "z-0": j === 3,
                        }
                      )}
                      onClick={() => handleCellClick(k, j)}
                    >
                      <Image
                        loader={boxImageLoader}
                        src={!gameNode.isShowing ? "full-box" : "empty-box"}
                        alt="boxImage"
                        className="-m-[4px] sm:-m-[8px]"
                        height={120}
                        width={120}
                      />
                      <span
                        className={cn(
                          "absolute text-ls text-black group-hover:font-semibold",
                          {
                            "text-white": !gameNode.isShowing,
                          }
                        )}
                      >
                        {gameNode.value ? (
                          <Image
                            loader={itemImageLoader}
                            src={gameNode.value.path}
                            alt="itemImage"
                            height={gameNode.size === "Küçük" ? 50 : 80}
                            width={gameNode.size === "Küçük" ? 50 : 80}
                          />
                        ) : (
                          ""
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-bold text-xl border border-slate-100 rounded-lg px-4 py-2">
                {currentLevel.directorSays}
              </h1>
              <Image
                loader={directorImageLoader}
                src="director"
                alt="directorImage"
                height={40}
                width={40}
              />
            </div>
          </div>
          <Progress value={(level * 100) / TOTAL_ROUNDS} />
        </div>
      )}
    </div>
  );
};

export default WeekOneDirectorTaskPage;
