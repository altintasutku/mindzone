"use client";

import React, { useEffect, useState } from "react";
import {
  allData,
  datas,
  GameImage,
  generateAnswers,
  Rules,
} from "@/assets/mockdata/weekGames/week3game2data";
import FinishScreen from "@/components/game/FinishScreen";
import WeekThreeGameTwoIntroductions from "@/app/(dashboard)/week/3/cognitive-flexibility/_introductions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { WeekData, sendWeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { getUser, updateUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";

const TOTAL_ROUNDS =
  datas.man.positive +
  datas.man.negative +
  datas.woman.positive +
  datas.woman.negative;

const imageLoader = ({ src }: { src: string }): string => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_three/cognitive_flexibility/${src}.jpg`;
};

const WeekThreeGameTwoPage = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [round, setRound] = useState(0);
  const [currentRule, setCurrentRule] = useState<Rules>(Rules.sex);

  const [currentData, setCurrentData] = useState<GameImage>();
  const [answers, setAnswers] = useState<GameImage[]>([]);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const session = useSession();

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 12,
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

  const nextRound = () => {
    if (round === TOTAL_ROUNDS) {
      setStats({
        ...stats,
        reactionTime: timer,
      });
      setIsFinished(true);
      return;
    }

    if (round % 20 <= 10) setCurrentRule(Rules.sex);
    else if (round % 20 <= 20) setCurrentRule(Rules.mod);
    setRound(round + 1);
    setCurrentData(allData[round]);
    setAnswers(generateAnswers(currentRule, allData[round]));

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleAnswer = (answer: GameImage) => {
    if (!currentData) return;

    if (currentRule === Rules.sex && answer.sex === currentData.sex) {
      setIsCorrect(true);
    } else if (currentRule === Rules.mod && answer.mod === currentData.mod) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      setIsCorrect(null);
      nextRound();
    }, 1000);
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen url='/week/3/inhibition' />
      ) : round === 0 ? (
        <div className='flex flex-col items-center'>
          <WeekThreeGameTwoIntroductions />

          <Button onClick={nextRound}>Başla</Button>
        </div>
      ) : isCorrect === null ? (
        <div>
          <div className={"text-center font-semibold my-2"}>Seçenekler</div>
          <div className={"grid grid-cols-2 md:grid-cols-4 gap-3"}>
            {answers.map((answer, index) => (
              <div key={index}>
                <Image
                  loader={imageLoader}
                  src={`${answer.sex}/${answer.mod}/${answer.number}`}
                  alt={"Answer Image"}
                  width={240}
                  height={240}
                  className={
                    "border border-slate-200 dark:border-slate-700 rounded-md cursor-pointer opacity-95 hover:opacity-100 transition-opacity"
                  }
                  onClick={() => handleAnswer(answer)}
                />
              </div>
            ))}
          </div>
          <div className={"flex justify-center mt-10"}>
            <Image
              loader={imageLoader}
              src={`${currentData?.sex}/${currentData?.mod}/${currentData?.number}`}
              alt={"Current Image"}
              width={240}
              height={240}
            />
          </div>
        </div>
      ) : isCorrect ? (
        <div className={"flex justify-center p-10"}>
          <span className={"text-green-500 text-lg font-semibold"}>Doğru</span>
        </div>
      ) : (
        <div className={"flex justify-center p-10"}>
          <span className={"text-red-500 text-lg font-semibold"}>Yanlış</span>
        </div>
      )}
    </div>
  );
};

export default WeekThreeGameTwoPage;
