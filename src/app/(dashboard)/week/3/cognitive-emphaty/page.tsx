"use client";
import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import WeekThreeGameFourIntroductions from "./_introductions";
import { WeekThreeGameFourQuestions } from "@/assets/mockdata/weekGames/week3game4data";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { getUser, updateUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";

const WeekThreeGameFourPage = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [round, setRound] = useState(0);
  const [isGreen, setIsGreen] = useState<boolean | null>(null);
  const [isYellow, setIsYellow] = useState<boolean | null>(null);
  const [trialNumber, setTrialNumber] = useState(0);

  const MAX_ROUND = WeekThreeGameFourQuestions.length;

  const session = useSession();

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 14,
    group: "W1",
  });

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

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

  const handleNext = () => {
    if (round >= MAX_ROUND) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }
    setIsGreen(null);
    setIsYellow(null);
    setTrialNumber(0);

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }

    setRound((prev) => prev + 1);
  };

  useEffect(() => {
    if (trialNumber === 2) {
      handleNext();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trialNumber]);

  useEffect(() => {
    if (isFinished) {
      mutate(stats);
      clearInterval(timeout!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleCheck = (answer: string) => {
    if (isFinished) {
      return;
    }

    if (trialNumber >= 2) {
      handleNext();
    } else {
      if (
        WeekThreeGameFourQuestions[round - 1].greens.sort().toString() ===
        answer.slice(0, 1).toString()
      ) {
        setStats((prev) => ({
          ...prev,
          totalAccuracy: prev.totalAccuracy + 2,
        }));
        setIsGreen(true);
        setIsYellow(false);
        setTrialNumber((prev) => prev + 1);
        handleNext();
      } else if (
        WeekThreeGameFourQuestions[round - 1].yellows.sort().toString() ===
        answer.slice(0, 1).toString()
      ) {
        setStats((prev) => ({
          ...prev,
          totalAccuracy: prev.totalAccuracy + 1,
        }));
        setIsGreen(false);
        setIsYellow(true);
      } else {
        setStats((prev) => ({
          ...prev,
          totalErrorCount: prev.totalErrorCount + 1,
        }));
        setIsGreen(false);
        setIsYellow(false);
        setTrialNumber((prev) => prev + 1);
      }
    }
  };

  return (
    <div>
      {isFinished ? (
        <div className='flex justify-center items-center'>
          <FinishScreen url='/week/3/inhibition' />
        </div>
      ) : round === 0 ? (
        <div className='flex flex-col'>
          <WeekThreeGameFourIntroductions />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={handleNext}>Başla</Button>
          </div>
        </div>
      ) : isGreen === false && isYellow === true ? (
        <>
          <p className=' text-2xl text-center my-5 text-green-600'>
            Doğru cevap, peki başka olası yanıt hangisi olabilir?
          </p>
          <div className='text-center'>
            <p className='text-xl font-normal'>
              {WeekThreeGameFourQuestions[round - 1].question}
            </p>
            <div className='my-10 flex flex-col justify-center text-wrap'>
              {WeekThreeGameFourQuestions[round - 1].options.map(
                (option, index) => (
                  <Button
                    onClick={() => {
                      handleCheck(option);
                    }}
                    variant={"outline"}
                    key={index}
                    className='mr-4 my-1'
                  >
                    {option}
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      ) : isGreen === false && isYellow === false ? (
        <>
          <p className=' text-2xl text-center my-5 text-green-600'>
            En etkili olabilecek başka cevap ne olabilir?
          </p>
          <div className='text-center'>
            <p className='text-xl font-normal'>
              {WeekThreeGameFourQuestions[round - 1].question}
            </p>
            <div className='my-10 flex flex-col justify-center text-wrap'>
              {WeekThreeGameFourQuestions[round - 1].options.map(
                (option, index) => (
                  <Button
                    onClick={() => {
                      handleCheck(option);
                    }}
                    variant={"outline"}
                    key={index}
                    className='mr-4 my-1'
                  >
                    {option}
                  </Button>
                )
              )}
            </div>
          </div>
        </>
      ) : isGreen! === null ? (
        <div>
          <div className='text-center'>
            <p className='text-xl font-normal mt-10'>
              {WeekThreeGameFourQuestions[round - 1].question}
            </p>
            <div className='my-10 flex flex-col justify-center flex-wrap'>
              {WeekThreeGameFourQuestions[round - 1].options.map(
                (option, index) => (
                  <Button
                    onClick={() => {
                      handleCheck(option);
                    }}
                    variant={"outline"}
                    key={index}
                    className='mr-4 my-1'
                  >
                    {option}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeekThreeGameFourPage;
