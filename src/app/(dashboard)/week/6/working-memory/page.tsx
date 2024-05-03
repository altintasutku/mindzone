"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import { data, GameImage } from "@/assets/mockdata/weekGames/week4game1data";
import { useSession } from "next-auth/react";
import { WeekData } from "@/lib/api/week";
import Image from "next/image";
import { useSendWeeklyData } from "@/hooks/useSendData";
import WeekSixGameOneIntroductions from "./_introductions";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_four/working_memory/${src}.JPG`;
};

const TOTAL_ROUNDS = 75;
const DURATION = 1500;
const CHANCE_OF_IMAGE = 0.2;

const WeekSixGameOnePage = () => {
  const [round, setRound] = React.useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);

  const [correct, setCorrect] = useState<number>(0);

  const [isBreakActive, setIsBreakActive] = useState<boolean>(true);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [current, setCurrent] = useState<GameImage | null>(null);

  const [history, setHistory] = useState<GameImage[]>([]);

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 26,
    group: "W1",
  });

  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      location.reload();
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
    if (round === 0 || isFinished || (correct === 1 && isBreakActive)) {
      return;
    }

    const timeout = setTimeout(
      () => {
        nextRound();
      },
      current ? DURATION : 500
    );

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }

    if (correct === 1 && isBreakActive) {
      return;
    }

    setRound((prev) => prev + 1);

    if (current) {
      setCurrent(null);
      return;
    }

    const percentage = (round * 100) / TOTAL_ROUNDS;

    // 10% of the time, select from the first third of the letters
    const letter =
      Math.random() > CHANCE_OF_IMAGE
        ? data[
            Math.floor(
              Math.random() *
                (percentage < 33
                  ? data.length / 3
                  : percentage < 66
                  ? (data.length / 3) * 2
                  : data.length)
            )
          ]
        : history[history.length - 2] || data[0];
    setCurrent(letter);

    if (history.length < 4) setHistory((prev) => [...prev, letter]);
    else {
      setHistory((prev) => [...prev.slice(1, 5), letter]);
    }
    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleAnswer = () => {
    if (!current || history.length < 3) return;

    if (history[history.length - 3].emotion === current.emotion) {
      setIsCorrect(true);
      setCorrect((prev) => prev + 1);
      setStats((prev) => ({ ...prev, totalAccuracy: prev.totalAccuracy + 1 }));
    } else {
      setIsCorrect(false);
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
    }

    setTimeout(() => {
      setIsCorrect(null);
    }, 1000);
  };

  const finishBreak = () => {
    setCorrect(0);
    setStats({
      totalErrorCount: 0,
      totalAccuracy: 0,
      reactionTime: 0,
      step: 16,
      group: "W1",
    });
    setRound(1);
    setHistory([]);
    setIsBreakActive(false);
  };

  return (
    <div className='flex flex-col items-center py-10'>
      {isFinished ? (
        <FinishScreen
          isSending={isSending}
          url='/week/4/cognitive-flexibility'
        />
      ) : round === 0 ? (
        <div className='flex flex-col'>
          <WeekSixGameOneIntroductions />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : correct === 1 && isBreakActive ? (
        <div className='flex flex-col items-center gap-4'>
          <div>
            <span className='text-green-500'>Tebrikler! Doğru bildin.</span>{" "}
            Deneme bitti hadi oyuna geçelim
          </div>
          <Button onClick={finishBreak}>Devam Et</Button>
        </div>
      ) : (
        <div className='flex flex-col gap-7 justify-center items-center w-full'>
          {correct < 1 && isBreakActive ? (
            <div className='flex gap-2'>
              {history.map((image, index) => (
                <span
                  key={image.emotion + index}
                  className={cn(
                    "text-3xl font-bold bg-yellow-600 rounded-sm p-1 min-h-32 sm:min-h-56 flex justify-center items-center",
                    {
                      "opacity-60": index !== 3,
                    }
                  )}
                >
                  <Image
                    loader={imageLoader}
                    alt={image.emotion}
                    src={`${image.emotion}/${image.index}`}
                    width={150}
                    height={150}
                  />
                </span>
              ))}
            </div>
          ) : (
            <span className='text-3xl font-bold bg-yellow-600 rounded-sm p-1 min-h-32 sm:min-h-56 flex justify-center items-center'>
              {current && (
                <Image
                  loader={imageLoader}
                  alt={current.emotion}
                  src={`${current?.emotion}/${current?.index}`}
                  width={150}
                  height={150}
                />
              )}
            </span>
          )}

          <Button
            onClick={handleAnswer}
            variant='outline'
            className={cn("flex justify-center px-16 py-4", {
              "bg-green-500 text-white hover:bg-green-500": isCorrect === true,
              "bg-red-500 text-white hover:bg-red-500": isCorrect === false,
            })}
          >
            <EyeIcon size={36} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default WeekSixGameOnePage;
