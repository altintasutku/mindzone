"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import WeekTwoGameFourIntroductions from "./_introductions";
import { useMutation } from "@tanstack/react-query";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { getUser, updateUser } from "@/lib/api/user";
import { useSession } from "next-auth/react";
import FinishScreen from "@/components/game/FinishScreen";
import { ZodUser } from "@/lib/validators/user";
import { useSendWeeklyData } from "@/hooks/useSendData";

type Question = {
  difficulty: string;
  index: number;
  imageFolder: string[];
};

const diffiulties = {
  easy: 20,
  medium: 20,
  hard: 20,
};

const allData: Question[] = [
  ...Array.from({ length: diffiulties.easy }).map((_, index) => {
    return {
      difficulty: "difficulty1",
      index: index + 1,
      imageFolder: ["1", "2", "3", "main", "true"],
    };
  }),
  ...Array.from({ length: diffiulties.medium }).map((_, index) => {
    return {
      difficulty: "difficulty2",
      index: index + 1,
      imageFolder: ["1", "2", "3", "main", "true"],
    };
  }),
  ...Array.from({ length: diffiulties.hard }).map((_, index) => {
    return {
      difficulty: "difficulty3",
      index: index + 1,
      imageFolder: ["1", "2", "3", "main", "true"],
    };
  }),
];

const imageLoader = ({ src }: { src: string }): string => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/${src}.JPG`;
};

const TOTAL_ROUND = allData.length - 1;

const Week2Game5Page = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [current, setCurrent] = useState<Question>();
  const [isModeEmotion, setIsModeEmotion] = useState<boolean | null>(null);

  const session = useSession();

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 10,
    group: "W1",
  });

  const [timer, setTimer] = useState(0);
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
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { send, isSending } = useSendWeeklyData();

  useEffect(() => {
    if (isFinished) {
      send(stats);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleNext = () => {
    setRound((prev) => prev + 1);

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleCheck = (item: string) => {
    if (item === "true") {
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
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  useEffect(() => {
    if (round === 20) {
      setIsModeEmotion(true);
    }
    if (round >= TOTAL_ROUND) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }

    setIsCorrect(null);

    if(!allData[round] || Object.hasOwnProperty.call(allData[round], "imageFolder") === false){
      setRound((prev) => prev - 1);
      setRound((prev) => prev + 1);
      return;
    }

    setCurrent((prev: Question | undefined) => ({
      ...allData[round],
      imageFolder: (allData[round].imageFolder || []).sort(
        () => Math.random() - 0.5
      ),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  return (
    <div>
      {isFinished ? (
        <FinishScreen isSending={isSending} url='/week/3' />
      ) : round === 0 ? (
        <div>
          <WeekTwoGameFourIntroductions />

          <div className='flex justify-center items-center mt-5'>
            <Button onClick={handleNext}>Devam</Button>
          </div>
        </div>
      ) : isCorrect === true ? (
        <div className='flex justify-center text-3xl text-green-600'>Doğru</div>
      ) : isCorrect === false ? (
        <div className='flex justify-center text-3xl text-red-600'>Yanlış</div>
      ) : isModeEmotion === true ? (
        <div className=' flex flex-col items-center'>
          <p>
            Ekranda her soru için bir yüz fotoğrafı göreceksiniz. Sizlerden bu
            fotoğraf aynı duygu olan kişiyle eşleştirmenizi istiyoruz.
          </p>
          <Button onClick={() => setIsModeEmotion(false)}>Devam</Button>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center '>
          <div>
            <Image
              src={`affective-emphaty/${current?.difficulty}/${
                current?.index
              }/${current?.imageFolder.filter((item) => item === "main")}`}
              loader={imageLoader}
              alt='image4'
              width={200}
              height={200}
              className='mx-2 rounded-md'
            />
          </div>
          <div className='my-5 grid grid-cols-2 md:grid-cols-4 gap-3'>
            {current &&
              current.imageFolder &&
              current.imageFolder.map((image, index) => {
                if (image !== "main") {
                  return (
                    <Image
                      key={index}
                      src={`affective-emphaty/${current?.difficulty}/${current?.index}/${image}`}
                      loader={imageLoader}
                      alt={`image${index + 1}`}
                      width={150}
                      height={150}
                      className='rounded-md mx-1'
                      onClick={() => handleCheck(image)}
                    />
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Week2Game5Page;
