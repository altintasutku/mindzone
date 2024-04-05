"use client";
import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import IntroductionWeekThreeGamethree from "./_introductions";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { set } from "zod";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/user";
import { cn } from "@/lib/utils";

const mods = { angry: 10, fear: 10, sad: 10, happy: 30 };

const imageLoader = ({ src }: { src: string }): string => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_three/inhibition/${src}.jpg`;
};

const positiveWords = [
  "SEVİNÇ",
  "HUZUR",
  "SAMİMİYET",
  "KAHKAHA",
  "GÜZEL",
  "BARIŞ",
];
const negativeWords = ["SAVAŞ", "ÖLÜM", "ÇIĞLIK", "HIRSIZ", "ÇİRKİN", "TERÖR"];

type DataType = {
  index: number;
  type: string;
  word: string;
};

let negativeToNegative = 0;
let positiveToPositive = 0;

const allData: DataType[] = [
  ...Array.from({ length: mods.angry }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "angry",
      word: "",
    })
  ),
  ...Array.from({ length: mods.fear }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "fear",
      word: "",
    })
  ),
  ...Array.from({ length: mods.sad }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "sad",
      word: "",
    })
  ),
  ...Array.from({ length: mods.happy }).map(
    (_, i): DataType => ({
      index: i + 1,
      type: "happy",
      word: "",
    })
  ),
]
  .sort(() => Math.random() - 0.5)
  .map((data) => {
    let word = "";

    if (data.type === "happy") {
      if (positiveToPositive < 15) {
        word = positiveWords[Math.floor(Math.random() * positiveWords.length)];
        positiveToPositive++;
      } else {
        word = negativeWords[Math.floor(Math.random() * negativeWords.length)];
      }
    } else {
      if (negativeToNegative < 15) {
        word = negativeWords[Math.floor(Math.random() * negativeWords.length)];
        negativeToNegative++;
      } else {
        word = positiveWords[Math.floor(Math.random() * positiveWords.length)];
      }
    }

    return {
      ...data,
      word,
    };
  });

const WeekThreeGameThree = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 13,
    group: "W1",
  });

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
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

  const handleNext = () => {
    if (round >= 10) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }
    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
    setRound((prev) => prev + 1);
    setIsImage((prev) => !prev);
  };

  const handleCheck = (data: DataType) => {
    if (data.type === "happy") {
      setIsCorrect(true);
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
    } else {
      setIsCorrect(false);
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
    }
  };

  useEffect(() => {
    if (isFinished) {
      mutate(stats);
      clearInterval(timeout!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    if (round === 0) {
      return;
    }
    setIsCorrect(null);
    setTimeout(
      () => {
        handleNext();
      },
      isImage ? 1000 : 2000
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  return (
    <div>
      {isFinished ? (
        <div className='flex justify-center items-center'>
          <FinishScreen url='/week/3/inhibition' />
        </div>
      ) : round === 0 ? (
        <div className='flex flex-col'>
          <IntroductionWeekThreeGamethree />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={handleNext}>Başla</Button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center h-96 justify-center'>
          {isImage ? (
            <div className='flex justify-center items-center h-[250px]'>
              <div className='mt-6 absolute text-black text-xl font-bold'>
                {allData[round - 1].word}
              </div>
              <Image
                width={200}
                height={200}
                loader={imageLoader}
                src={`${allData[round - 1].type}/${allData[round - 1].index}`}
                alt='emotion image'
              />
            </div>
          ) : (
            <div className='h-[250px]'></div>
          )}
          <div className='flex justify-center items-center my-6 w-20'>
            <Button
              className={cn(
                "",
                isCorrect
                  ? "bg-green-500 hover:bg-green-500"
                  : isCorrect === false
                  ? "bg-red-500 hover:bg-red-500"
                  : ""
              )}
              variant={"outline"}
              onClick={() => {
                handleCheck(allData[round - 1]);
              }}
            >
              {isCorrect === null
                ? "Mutlu mu?"
                : isCorrect
                ? "Doğru"
                : "Yanlış"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekThreeGameThree;
