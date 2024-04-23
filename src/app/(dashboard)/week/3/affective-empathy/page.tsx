"use client";

import React, { useEffect, useState } from "react";
import WeekThreeGameThreeIntroductions from "./_introductions";
import { Button } from "@/components/ui/button";
import {
  questions,
  QuestionType,
} from "@/assets/mockdata/weekGames/week3game5data";
import Image from "next/image";
import FinishScreen from "@/components/game/FinishScreen";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { getUser, updateUser } from "@/lib/api/user";
import { useSession } from "next-auth/react";
import { ZodUser } from "@/lib/validators/user";

const TOTAL_ROUNDS = 31;

const ANSWERS = ["A", "B", "C", "D", "E"];

const imageLoader = ({ src }: { src: string }): string => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_three/affective_empathy/${src}.jpg`;
};

const WeekThreeGameFivePage = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const session = useSession();

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 15,
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

  const { mutate } = useMutation({
    mutationFn: async (data: WeekData) => {
      if (!session.data) {
        return;
      }

      let user: ZodUser;
      try {
        user = await getUser({
          accessToken: session.data.user.accessToken,
          userId: session.data.user.id,
        });
      } catch (e) {
        return;
      }
      await sendWeekData(data, session.data.user.accessToken);

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            WeeklyStatus: parseInt(user.userDetails.WeeklyStatus) + 1 + "",
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!isFinished) return;

    mutate(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const [currentData, setCurrentData] = useState<QuestionType>();

  const handleNext = () => {
    if (round === TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));

      setIsFinished(true);
      return;
    }

    setRound(round + 1);
    setCurrentData(questions[round]);

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleAnswer = (index: number) => {
    if (isCorrect !== null) {
      return;
    }

    if (currentData?.answer === ANSWERS[index]) {
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
      setIsCorrect(null);
      handleNext();
    }, 1200);
  };

  return (
    <div>
      {isFinished ? (
        <div>
          <FinishScreen url='/week/4/' />
        </div>
      ) : round === 0 ? (
        <div className='flex flex-col items-center'>
          <WeekThreeGameThreeIntroductions />
          <Button onClick={handleNext}>Başla</Button>
        </div>
      ) : isCorrect === null ? (
        <div>
          {currentData && (
            <div>
              <p>{currentData.question}</p>
              <div className='grid grid-cols-3 md:grid-cols-5 justify-items-center gap-4 mt-5'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image
                    key={index}
                    loader={imageLoader}
                    src={`SORU ${round}/${index + 1}`}
                    className='rounded-md cursor-pointer'
                    width={200}
                    height={200}
                    alt='image'
                    onClick={() => handleAnswer(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : isCorrect ? (
        <div className='text-center'>
          <p className='text-green-500 font-bold text-2xl'>Doğru</p>
        </div>
      ) : (
        <div className='text-center'>
          <p className='text-red-500 font-bold text-2xl'>Yanlış</p>
        </div>
      )}
    </div>
  );
};

export default WeekThreeGameFivePage;
