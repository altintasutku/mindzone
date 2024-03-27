"use client";

import { performanceTestFiveQuestions } from "@/assets/mockdata/performaceTests/performanceTestFive";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IntroductionTestFive from "./_introductions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FinishScreen from "@/components/game/FinishScreen";
import { useSession } from "next-auth/react";

import { useUserStore } from "@/hooks/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { sendPerformanceTaskData } from "@/lib/api/performanceTasks";
import { updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";

const TOTAL_ROUNDS = performanceTestFiveQuestions.length;

const loader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/eyes/${src}.png`;
};

const DURATION = 600;

const Page = () => {
  const [round, setRound] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<TestFiveQuestion>();

  const [isFinished, setIsFinished] = useState(false);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [isTutorial, setIsTutorial] = useState(true);

  const [stats, setStats] = useState<{
    totalWrongs: number;
    resistanceWrongs: number;
    reactionTime: number;
  }>({
    totalWrongs: 0,
    resistanceWrongs: 0,
    reactionTime: 0,
  });

  const [timer, setTimer] = useState<number>(0);
  let timeout: NodeJS.Timeout;

  const session = useSession();
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      location.reload()
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange, false);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (round === 1 || isTutorial) {
      setCurrentQuestion(performanceTestFiveQuestions[round - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (!isFinished) {
      return;
    }
    mutate();

    clearInterval(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleNext = () => {
    if (round >= TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }
    setRound((prev) => prev + 1);
    if (!timeout) {
      timeout = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }
  };

  const handleAnswer = (answer: number) => {
    if (currentQuestion?.correctAnswer === answer) {
      setIsCorrect(true);
    } else if (isTutorial) {
      setIsCorrect(false);
      setTimeout(() => {
        setIsCorrect(null);
      }, DURATION);
      return;
    } else {
      setIsCorrect(false);
      setStats((prev) => ({
        ...prev,
        totalWrongs: prev.totalWrongs + 1,
      }));
    }
    setCurrentQuestion(performanceTestFiveQuestions[round - 1]);

    setTimeout(() => {
      handleNext();
      setIsCorrect(null);
    }, DURATION);
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!session.data || !user) {
        throw new Error("Session not found");
      }
      await sendPerformanceTaskData({
        accessToken: session.data.user.accessToken,
        stats: {
          ...stats,
          totalAccuracy: TOTAL_ROUNDS - 1 - stats.totalWrongs,
        },
        stepInfo: { step: 5, group: user.userDetails.Status },
      });

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            PerformanceTaskStep: "1",
            Status: "S2",
          },
        },
      });
    },
    onSuccess: () => {
      router.push("/question/2");
    },
  });

  return (
    <div>
      {isFinished ? (
        <FinishScreen url='/question/2' />
      ) : round === 0 ? (
        <div className='flex flex-col items-center'>
          <IntroductionTestFive />
          <Button className='my-5 w-24' onClick={handleNext}>
            Başla
          </Button>
        </div>
      ) : isTutorial && round == 2 ? (
        <div className='flex flex-col items-center'>
          <p>Tebrikler deneme bitti! Şimdi devam edelim</p>
          <Button className='my-5 w-24' onClick={() => setIsTutorial(false)}>
            Devam
          </Button>
        </div>
      ) : currentQuestion ? (
        <div className='grid grid-cols-4'>
          <AnswerButton
            isCorrect={isCorrect}
            handleAnswer={handleAnswer}
            idx={0}
          >
            {currentQuestion.answers[0]}
          </AnswerButton>
          <div className='col-span-2'></div>
          <AnswerButton
            isCorrect={isCorrect}
            handleAnswer={handleAnswer}
            idx={1}
          >
            {currentQuestion.answers[1]}
          </AnswerButton>

          <div></div>
          <div className='relative col-span-2'>
            {isCorrect === null ? (
              <></>
            ) : isCorrect ? (
              <div className='absolute inset-0 text-xl font-semibold flex justify-center items-center text-green-500'>
                Doğru
              </div>
            ) : (
              <div className='absolute inset-0 text-xl font-semibold flex justify-center items-center text-red-500'>
                Yanlış
              </div>
            )}
            <Image
              loader={loader}
              src={currentQuestion.path}
              alt='testFiveImage'
              className={cn("w-full rounded-md", {
                "opacity-0": isCorrect !== null,
              })}
              height={300}
              width={300}
            />
          </div>
          <div></div>

          <AnswerButton
            isCorrect={isCorrect}
            handleAnswer={handleAnswer}
            idx={2}
          >
            {currentQuestion.answers[2]}
          </AnswerButton>
          <div className='col-span-2'></div>
          <AnswerButton
            isCorrect={isCorrect}
            handleAnswer={handleAnswer}
            idx={3}
          >
            {currentQuestion.answers[3]}
          </AnswerButton>
        </div>
      ) : null}
    </div>
  );
};

type AnswerProps = {
  isCorrect: boolean | null;
  handleAnswer: (answer: number) => void;
  children: React.ReactNode;
  idx: number;
};

const AnswerButton = ({
  isCorrect,
  handleAnswer,
  children,
  idx,
}: AnswerProps) => {
  return (
    <div
      onClick={() => {
        if (isCorrect === null) {
          handleAnswer(idx);
        }
      }}
      className='text-wrap cursor-pointer flex justify-center items-center text-center bg-slate-100 dark:bg-slate-600 rounded-md'
    >
      {children}
    </div>
  );
};

export default Page;
