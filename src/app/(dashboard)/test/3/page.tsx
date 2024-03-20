"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import IntroductionTestThree from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { sendPerformanceTaskData } from "@/lib/api/performanceTasks";
import { updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";

enum GO_NOGO {
  GO = "GO",
  NOGO = "NOGO",
  NONE = "NONE",
}

const REACTION_TIME = 1000;

const TOTAL_ROUNDS = (15 * 60) / (REACTION_TIME / 1000 + 0.5);

const PerformanceTestPageThree = () => {
  const { toast } = useToast();

  const [current, setCurrent] = React.useState<GO_NOGO>(GO_NOGO.NONE);

  const [round, setRound] = React.useState(0);

  const [isFinished, setIsFinished] = React.useState(false);

  const [timer, setTimer] = useState<number>(0);
  let timeout: NodeJS.Timeout;

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  const [stats, setStats] = useState<{
    totalWrongs: number;
    resistanceWrongs: number;
    reactionTime: number;
  }>({
    totalWrongs: 0,
    resistanceWrongs: 0,
    reactionTime: 0,
  });

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }

    setRound((prev) => prev + 1);

    if (current === GO_NOGO.NONE)
      setCurrent(Math.random() > 0.3 ? GO_NOGO.GO : GO_NOGO.NOGO);
    else setCurrent(GO_NOGO.NONE);

    if (!timeout) {
      timeout = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }
  };

  useEffect(() => {
    if (round === 0) return;

    const timer = setTimeout(
      () => {
        nextRound();
      },
      current === GO_NOGO.NONE ? 500 : REACTION_TIME
    );

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(
    () => {
      if (!isFinished) {
        return;
      }

      clearInterval(timeout);
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      mutate();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFinished]
  );

  const handleClick = () => {
    if (current === GO_NOGO.GO) {
      nextRound();
    } else {
      toast({
        title: "Hatalı!",
        description: "Gitme yazarken butona bastın!",
        variant: "destructive",
        duration: REACTION_TIME,
      });
      setStats((prev) => ({
        ...prev,
        totalWrongs: prev.totalWrongs + 1,
      }));
    }
  };

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!session.data || !user) {
        throw new Error("Session not found");
      }
      await sendPerformanceTaskData({
        accessToken: session.data.user.accessToken,
        stats: { ...stats, totalAccuracy: TOTAL_ROUNDS - stats.totalWrongs },
        stepInfo: { step: 3, group: user.userDetails.Status },
      });

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            PerformanceTaskStep: "4",
          },
        },
      });

      setUser({ ...user, userDetails: { ...user.userDetails, PerformanceTaskStep: "4" } });
    },
    onSuccess: () => {
      router.push("/test/4");
    },
  });

  return (
    <div>
      {isFinished ? (
        <FinishScreen url='/test/4' />
      ) : round === 0 ? (
        <div>
          <IntroductionTestThree />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <div className='min-h-96 flex flex-col justify-center items-center'>
          <div className='h-24'>
            {current === GO_NOGO.GO ? (
              <div className='text-green-500 text-4xl flex justify-center items-center'>
                Git
              </div>
            ) : current === GO_NOGO.NOGO ? (
              <div className='text-red-500 text-4xl flex justify-center items-center'>
                Gitme
              </div>
            ) : (
              <span></span>
            )}
          </div>
          <Button
            className='px-10'
            onClick={handleClick}
            disabled={current === GO_NOGO.NONE}
          >
            GIT
          </Button>
        </div>
      )}
    </div>
  );
};

export default PerformanceTestPageThree;
