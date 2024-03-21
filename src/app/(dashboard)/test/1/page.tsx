"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import IntroductionsTestOne from "./_introductions";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sendPerformanceTaskData } from "@/lib/api/performanceTasks";
import { useUserStore } from "@/hooks/useUserStore";

const imageColors = ["red", "green", "blue", "yellow"];
const imageShapes = ["Dots", "Triangles", "Crosses", "Stars"];

enum Rules {
  shape = "shape",
  color = "color",
  count = "count",
}

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/test_one_images/${src}.jpg`;
};

const answers = [
  {
    number: "1",
    color: "red",
    shape: "Dots",
  },
  {
    number: "2",
    color: "green",
    shape: "Triangles",
  },
  {
    number: "3",
    color: "blue",
    shape: "Crosses",
  },
  {
    number: "4",
    color: "yellow",
    shape: "Stars",
  },
];

const TOTAL_ROUNDS = 200;

const CORRECT_DURATION = 1000;

const PerformanceTestOnePage = () => {
  const { toast } = useToast();

  const router = useRouter();
  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const updateUser = useUserStore((state) => state.updateUser);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const correctToats = () => {
    setIsCorrect(true);
    setTimeout(() => {
      setIsCorrect(null);
      nextRound();
    }, CORRECT_DURATION);
  };

  const wrongToats = () => {
    setIsCorrect(false);
    setTimeout(() => {
      setIsCorrect(null);
      nextRound();
    }, CORRECT_DURATION);

    setStats((prev) => ({
      ...prev,
      totalWrongs: prev.totalWrongs + 1,
      resistanceWrongs:
        round % 10 === 2 ? prev.resistanceWrongs + 1 : prev.resistanceWrongs,
    }));
  };

  const [timer, setTimer] = useState<number>(0);
 const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<{
    totalWrongs: number;
    resistanceWrongs: number;
    reactionTime: number;
  }>({
    totalWrongs: 0,
    resistanceWrongs: 0,
    reactionTime: 0,
  });

  const [currentShape, setCurrentShape] = useState<{
    number: string;
    color: string;
    shape: string;
  }>();
  const [currentRule, setCurrentRule] = useState<Rules>(Rules.shape);
  const [round, setRound] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!session.data || !user) {
        throw new Error("Session not found");
      }

      await sendPerformanceTaskData({
        accessToken: session.data.user.accessToken,
        stats: { ...stats, totalAccuracy: TOTAL_ROUNDS - stats.totalWrongs },
        stepInfo: { step: 1, group: user.userDetails.Status },
      });

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            PerformanceTaskStep: "2",
          },
        },
      });

      setUser({ ...user, userDetails: { ...user.userDetails, PerformanceTaskStep: "2" } });
    },
    onSuccess: () => {
      router.push("/test/2");
    },
  });

  useEffect(() => {
    if (!isFinished) {
      return;
    }

    // Stop the timer
    
    setStats((prev) => ({ ...prev, reactionTime: timer }));

    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      toast({
        title: "Test Finished",
        description: "You have finished the test.",
        variant: "success",
        duration: 2000,
      });
      setIsFinished(true);
      return;
    }

    if (round % 40 <= 10) setCurrentRule(Rules.shape);
    else if (round % 40 <= 20) setCurrentRule(Rules.color);
    else if (round % 40 <= 30) setCurrentRule(Rules.count);
    else setCurrentRule(Rules.shape);
    setRound((prev) => prev + 1);
    setCurrentShape(generateRandomImage());
    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleAnswer = (answerIndex: number) => {
    if (currentRule === Rules.shape) {
      if (answers[answerIndex].shape === currentShape?.shape) correctToats();
      else wrongToats();
    } else if (currentRule === Rules.color) {
      if (answers[answerIndex].color === currentShape?.color) correctToats();
      else wrongToats();
    } else if (currentRule === Rules.count) {
      if (answers[answerIndex].number === currentShape?.number) correctToats();
      else wrongToats();
    }
  };

  return (
    <div className='flex flex-col items-center py-10'>
      {isFinished ? (
        <FinishScreen url='/test/2' />
      ) : round === 0 ? (
        <div className='flex flex-col'>
          <IntroductionsTestOne />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <>
          {isCorrect === null && currentShape ? (
            <Image
              className='border border-stone-200 rounded-md'
              loader={imageLoader}
              src={`${currentShape.number}${currentShape.color}${currentShape.shape}`}
              alt='random'
              width={100}
              height={100}
            />
          ) : isCorrect === true ? (
            <div className='text-green-500 text-xl font-semibold w-[100px] h-[100px] flex justify-center items-center'>
              Doğru
            </div>
          ) : isCorrect === false ? (
            <div className='text-red-500 text-xl font-semibold w-[100px] h-[100px] flex justify-center items-center'>
              Yanlış
            </div>
          ) : null}
          <Separator className='my-5 opacity-50' />
          <small className='test-sm opacity-65 mb-2'>Seçenekler</small>
          <div className='grid grid-cols-2 sm:flex gap-4'>
            {answers.map((answer, index) => (
              <Image
                key={index}
                loader={imageLoader}
                className='border border-slate-400 rounded-md cursor-pointer hover:shadow-md hover:border-slate-700 transition duration-300 ease-in-out'
                src={`${answer.number}${answer.color}${answer.shape}`}
                alt={`${answer.number}${answer.color}${answer.shape}`}
                width={100}
                height={100}
                onClick={() => handleAnswer(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const generateRandomImage = () => {
  const randomNumber = (Math.floor(Math.random() * 4) + 1).toString();
  const randomShape = imageShapes[Math.floor(Math.random() * 4)];
  const randomColor = imageColors[Math.floor(Math.random() * 4)];
  return {
    number: randomNumber,
    color: randomColor,
    shape: randomShape,
  };
};

export default PerformanceTestOnePage;
