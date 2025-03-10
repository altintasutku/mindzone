"use client";

import React, { useEffect, useState } from "react";
import DirectorTaskIntroductions from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import FinishScreen from "@/components/game/FinishScreen";
import {
  DirectorGame,
  Level,
  Size,
} from "@/assets/mockdata/weekGames/week1DirectorGame";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";
import { useSendWeeklyData } from "@/hooks/useSendData";

const boxImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
};

const directorImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
};

const itemImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
};

const TOTAL_ROUNDS = 100;

const game = new DirectorGame(TOTAL_ROUNDS);

const WeekOneDirectorTaskPage = () => {
  const [level, setLevel] = useState<number>(-1);
  const [isFinished, setIsFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const session = useSession();

  const [currentLevel, setCurrentLevel] = useState<Level>(game.getLevel(level));

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 4,
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
          }, 10),
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
        false,
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
    if (level === 0 || level === -1) return;
    setCurrentLevel(game.getLevel(level - 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  const handleNextRound = () => {
    if (level === TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));

      setIsFinished(true);
      return;
    }

    setLevel((prev) => prev + 1);

    if (!timeout && level > -1) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10),
      );
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (
      currentLevel.directorSays.coordinates[0] === col &&
      currentLevel.directorSays.coordinates[1] === row
    ) {
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setIsCorrect(true);
    } else {
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
      setIsCorrect(false);
    }

    setTimeout(() => {
      handleNextRound();
      setIsCorrect(null);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center gap-7">
      {isFinished ? (
        <FinishScreen isSending={isSending} url="/week/1/affective-empathy" />
      ) : level === -1 ? (
        <>
          <DirectorTaskIntroductions />

          <Separator />

          <Button onClick={handleNextRound}>Başla</Button>
        </>
      ) : level === 0 ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-semibold border border-slate-100 rounded-lg px-4 py-2">
            Merhaba! Ben bu egzersizdeki yönetmenim. Sizlerden bazı objeleri
            seçmenizi isteyeceğim. Hadi başlayalım!
          </h1>
          <Image
            loader={directorImageLoader}
            src="director"
            alt="directorImage"
            height={60}
            width={60}
          />
          <Button onClick={handleNextRound}>Başla</Button>
        </div>
      ) : currentLevel ? (
        <div className="space-y-10 sm:my-10">
          <div className="grid grid-cols-6 gap-5">
            <div className="flex flex-col items-center my-20 col-span-4 mt-40 sm:mt-0">
              {currentLevel.shelf.items.map((row, j) => (
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
                        },
                      )}
                      onClick={() => handleCellClick(k, j)}
                    >
                      <Image
                        loader={boxImageLoader}
                        src={!gameNode.isVisible ? "full-box" : "empty-box"}
                        alt="boxImage"
                        className="-m-[4px] sm:-m-[9px]"
                        height={140}
                        width={140}
                      />
                      <span
                        className={cn(
                          "absolute text-ls text-black group-hover:font-semibold",
                          {
                            "text-white": !gameNode.isVisible,
                          },
                        )}
                      >
                        {gameNode.image ? (
                          <Image
                            loader={itemImageLoader}
                            src={gameNode.image.path}
                            alt="itemImage"
                            height={
                              gameNode.size === Size.SMALL
                                ? 20
                                : gameNode.size === Size.MEDIUM
                                  ? 50
                                  : 100
                            }
                            width={
                              gameNode.size === Size.SMALL
                                ? 20
                                : gameNode.size === Size.MEDIUM
                                  ? 50
                                  : 100
                            }
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
            <div className="flex flex-col items-center gap-4 col-span-2">
              <h1
                className={cn(
                  "font-bold text-xl border border-slate-100 rounded-lg px-4 py-2",
                  {
                    "text-green-500 border-green-500": isCorrect === true,
                    "text-red-500 border-red-500": isCorrect === false,
                  },
                )}
              >
                {isCorrect === null
                  ? `Ben ${currentLevel.directorSays.size} ${currentLevel.directorSays.image?.name} istiyorum!`
                  : isCorrect
                    ? "Tebrikler!"
                    : "Yanlış!"}
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
      ) : null}
    </div>
  );
};

export default WeekOneDirectorTaskPage;
