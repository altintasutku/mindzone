"use client";

import {
  GameImage,
  generateRound,
  Rule,
} from "@/assets/mockdata/weekGames/week4game2data";
import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import WeekFourGameTwoIntroductions from "./_introductions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { getUser, updateUser } from "@/lib/api/user";
import { useSession } from "next-auth/react";
import { ZodUser } from "@/lib/validators/user";
import { useSendWeeklyData } from "@/hooks/useSendData";

const TOTAL_ROUNDS = 75;

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_four/cognitive_flexibility/${src}.jpg`;
};

const WeekFourGameTwoPage = () => {
  const [round, setRound] = useState(0);
  const [currentGame, setCurrentGame] = useState<GameImage[]>([]);
  const [roundImage, setRoundImage] = useState<GameImage | null>(null);
  const [rule, setRule] = useState<Rule>(Rule.MounthType);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [isFinished, setIsFinished] = useState(false);

  const session = useSession();

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 17,
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
    if (round === 0) {
      return;
    }
    if (round >= TOTAL_ROUNDS) {
      setStats({
        ...stats,
        reactionTime: timer,
      });
      setIsFinished(true);
      return;
    }

    const { images, roundImage } = generateRound(rule);

    setCurrentGame(images.sort(() => Math.random() - 0.5));
    setRoundImage(roundImage);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const handleAnswer = (index: number) => {
    if (rule === Rule.Sex) {
      setIsCorrect(roundImage?.sex === currentGame[index].sex);
    } else if (rule === Rule.MounthType) {
      setIsCorrect(roundImage?.mounthType === currentGame[index].mounthType);
    } else {
      setIsCorrect(roundImage?.mod === currentGame[index].mod);
    }

    setTimeout(() => {
      setIsCorrect(null);
      handleNextRound();
    }, 1500);
  };

  const handleNextRound = () => {
    if (round % 30 <= 10) setRule(Rule.MounthType);
    else if (round % 30 <= 20) setRule(Rule.Sex);
    else setRule(Rule.Mod);
    setRound(round + 1);

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen isSending={isSending} url='/week/4/inhibition' />
      ) : round === 0 ? (
        <div className='flex flex-col items-center'>
          <WeekFourGameTwoIntroductions />

          <Button onClick={handleNextRound}>Başla</Button>
        </div>
      ) : isCorrect === null ? (
        <div className='flex flex-col items-center gap-5'>
          {roundImage && (
            <Image
              loader={imageLoader}
              src={`${roundImage.mounthType}/${roundImage.sex}/${roundImage.mod}/${roundImage.index}`}
              width={300}
              height={300}
              alt='gameImage'
              className='rounded-md'
            />
          )}
          <div className='flex flex-wrap gap-5'>
            {currentGame.map((gameImage, index) => (
              <div key={index} onClick={() => handleAnswer(index)}>
                <Image
                  className='cursor-pointer border border-slate-200 dark:border-slate-700 transition-all rounded-md overflow-hidden'
                  loader={imageLoader}
                  src={`${gameImage.mounthType}/${gameImage.sex}/${gameImage.mod}/${gameImage.index}`}
                  width={150}
                  height={150}
                  alt='gameImage'
                />
              </div>
            ))}
          </div>
        </div>
      ) : isCorrect ? (
        <div>
          <h1 className='font-semibold text-3xl text-green-500 text-center'>
            Doğru
          </h1>
        </div>
      ) : (
        <div>
          <h1 className='font-semibold text-3xl text-red-500 text-center'>
            Yanlış
          </h1>
        </div>
      )}
    </div>
  );
};

export default WeekFourGameTwoPage;
