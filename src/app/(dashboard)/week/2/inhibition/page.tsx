"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import WeekTwoGameThreeIntroduction from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { WeekData, sendWeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/user";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";

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
    }),
  ),
  ...Array.from({ length: mods.positive }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "positive",
    }),
  ),
].sort(() => Math.random() - 0.5);

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/inhibition/${src}.JPG`;
};

const TOTAL_ROUNDS = mods.negative + mods.positive;

const MIN_REACTION_TIME = 1400;
const MAX_REACTION_TIME = 1600;

const WeekTwoGameThreePage = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const [currentData, setCurrentData] = useState<DataType | null>(null);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 7,
    group: "W1",
  });

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleVisibilityChange = () => {
    window.location.reload();
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

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }

    if (currentData === null) {
      setRound((prev) => prev + 1);
      setCurrentData(allData[round - 1]);
    } else setCurrentData(null);

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10),
      );
    }
  };

  useEffect(() => {
    if (round === 0 || isFinished) return;

    const timerTwo = setTimeout(
      () => {
        nextRound();
      },
      currentData === null
        ? 500
        : Math.random() * (MAX_REACTION_TIME - MIN_REACTION_TIME) +
            MIN_REACTION_TIME,
    );

    return () => clearTimeout(timerTwo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentData]);

  const handleClick = () => {
    if (currentData?.type === "positive") {
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
