"use client";

import { performanceTestFiveQuestions } from "@/assets/mockdata/performaceTests/performanceTestFive";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import IntroductionTestFive from "./_introductions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FinishScreen from "@/components/game/FinishScreen";
import { useSession } from "next-auth/react";

import {
  InitPerformanceData,
  PerformanceData,
} from "@/lib/api/performanceTasks";
import { updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useSendPerformanceTaskData } from "@/hooks/useSendData";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";

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

  const session = useSession();
  const { user } = useProtectedRoute();

  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState<PerformanceData>(InitPerformanceData);

  const [timer, setTimer] = useState<number>(0);
  let timeout: NodeJS.Timeout;

  const router = useRouter();

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

  useEffect(() => {
    if (round === 1 || isTutorial) {
      setCurrentQuestion(performanceTestFiveQuestions[round - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const { send, isSending } = useSendPerformanceTaskData();

  const sendData = async () => {
    if (!session.data || !user) return;

    await send({
      step: 5,
      stats,
    });

    await updateUser({
      accessToken: session.data.user.accessToken,
      user: {
        ...user,
        userDetails: {
          ...user.userDetails,
          PerformanceTaskStep: "1",
          Status: user.userDetails.Status === "PT1" ? "S2" : "S4",
        },
      },
    });
  };

  useEffect(() => {
    if (!isFinished) {
      return;
    }

    sendData();

    clearInterval(timeout);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    setCurrentQuestion(performanceTestFiveQuestions[round - 1]);
  }, [round]);

  const handleNext = () => {
    if (round >= TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        totalAccuracy: TOTAL_ROUNDS - 1 - prev.totalWrongs,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }
    setIsLoaded(false);
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

    setTimeout(() => {
      handleNext();
      setIsCorrect(null);
    }, DURATION);
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen isSending={isSending} url='/question/2' />
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
        <div
          className={cn("grid grid-cols-4", {
            "opacity-0": !isLoaded,
          })}
        >
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
              onLoad={() => setIsLoaded(true)}
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
