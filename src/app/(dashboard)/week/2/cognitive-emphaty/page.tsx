"use client";
import { weekTwoGame4Data } from "@/assets/mockdata/weekGames/week2game4data";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import FinishScreen from "@/components/game/FinishScreen";
import WeekTwoGameFourIntroductions from "./_introductions";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { updateUser } from "@/lib/api/user";

const MAXROUND = weekTwoGame4Data.length - 1;

const WeekTwoGameFourPage = () => {
  const [round, setRound] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 8,
    group: "W1",
  });

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

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
      if (!session.data || !user) return;

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

      setUser({
        ...user,
        userDetails: {
          ...user.userDetails,
          WeeklyStatus: parseInt(user.userDetails.WeeklyStatus) + 1 + "",
        },
      });
    },
  });

  useEffect(() => {
    if (!isFinished) {
      return;
    }

    mutate(stats);

    clearInterval(timeout!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    if (!isFinished) {
      setIsCorrect(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const handleNext = () => {
    if (round >= MAXROUND) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    } else {
      setRound((round) => round + 1);
      if (!timeout) {
        setMyTimeout(
          setInterval(() => {
            setTimer((prev) => prev + 10);
          }, 10)
        );
      }
    }
  };

  const handleCheck = (option: string) => {
    if (
      weekTwoGame4Data[round - 1].correctAnswer.charAt(0) === option.charAt(0)
    ) {
      setIsCorrect(true);
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setTimeout(() => {
        handleNext();
      }, 1000);
    } else {
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
      setIsCorrect(false);
    }
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen url="/week/2/affective-empathy" />
      ) : round === 0 ? (
        <div>
          <WeekTwoGameFourIntroductions />

          <div className="flex justify-center items-center mt-5">
            <Button onClick={handleNext}>Devam</Button>
          </div>
        </div>
      ) : isCorrect === true ? (
        <div className="flex justify-center items-center text-3xl text-green-600">
          Tebrikler Doğru Cevap
        </div>
      ) : isCorrect === false ? (
        <div className="flex flex-col justify-center items-center">
          <p className="text-lg">{weekTwoGame4Data[round - 1].ifWrong}</p>
          <Button
            className="my-5 bg-red-400 hover:bg-red-950"
            onClick={handleNext}
          >
            Devam
          </Button>
        </div>
      ) : (
        <div>
          <div>
            <p className="lg:mx-10 sm:mx-0 font-bold">
              {weekTwoGame4Data[round - 1].question}
            </p>
            <div className=" flex flex-col md:flex-row flex-wrap my-10 justify-center">
              {weekTwoGame4Data[round - 1].options.map((option, index) => (
                <div className="xlg:mx-10 lg:mx-4 sm:mx-0 my-2 " key={index}>
                  <div
                    onClick={() => {
                      handleCheck(option);
                    }}
                    className={
                      "text-wrap border-[0.5px] border-slate-200 rounded cursor-pointer hover:bg-slate-100 hover:dark:bg-slate-800 transition-colors min-h-10 flex items-center font-semibold p-0 sm:p-4"
                    }
                  >
                    {option}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekTwoGameFourPage;
