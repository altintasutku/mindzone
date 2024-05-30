"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import IntroductionTestThree from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import {
  PerformanceData,
  sendPerformanceTaskData,
} from "@/lib/api/performanceTasks";
import { getUser, updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { ZodUser } from "@/lib/validators/user";
import { useSendPerformanceTaskData } from "@/hooks/useSendData";
import { stat } from "fs";

enum GO_NOGO {
  GO = "GO",
  NOGO = "NOGO",
  NONE = "NONE",
}

const REACTION_TIME = 1000;

const TOTAL_ROUNDS = (15 * 60) / (REACTION_TIME / 1000 + 0.5);
const TRAINING_ROUNDS = 20;

const PerformanceTestPageThree = () => {
  const { toast } = useToast();

  const [current, setCurrent] = React.useState<GO_NOGO>(GO_NOGO.NONE);

  const [corrects, setCorrects] = useState<number>(0);

  const [round, setRound] = React.useState(0);

  const [isFinished, setIsFinished] = React.useState(false);

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

  const session = useSession();
  const router = useRouter();

  const [isTraining, setIsTraining] = useState(true);

  const [isClicked, setIsClicked] = useState(false);

  const [stats, setStats] = useState<PerformanceData>({
    totalWrongs: 0,
    resistanceWrongs: 0,
    reactionTime: 0,
    totalAccuracy: 0,
    missing: 0,
  });

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

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        totalAccuracy: corrects,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }

    setRound((prev) => prev + 1);

    if (current === GO_NOGO.NONE)
      setCurrent(Math.random() > 0.3 ? GO_NOGO.GO : GO_NOGO.NOGO);
    else setCurrent(GO_NOGO.NONE);

    if (!timeout && round >= TRAINING_ROUNDS) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  useEffect(() => {
    if (round === 0) return;

    const timer = setTimeout(
      () => {
        if (!isClicked) {
          if (current === GO_NOGO.GO) {
            setStats((prev) => ({
              ...prev,
              missing: prev.missing + 1,
            }));
          }
        }
        nextRound();
      },
      current === GO_NOGO.NONE ? 500 : REACTION_TIME
    );

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  const { send, isSending } = useSendPerformanceTaskData();

  useEffect(
    () => {
      if (!isFinished) {
        return;
      }

      send({
        stats,
        step: 2,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFinished]
  );

  const handleClick = () => {
    if (current === GO_NOGO.GO) {
      setCorrects((prev) => prev + 1);
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

  return (
    <div>
      {isFinished ? (
        <FinishScreen isSending={isSending} url='/test/3' />
      ) : isTraining && round >= TRAINING_ROUNDS ? (
        <div>
          <p>
            <b>Eğitim bitti</b>. Şimdi gerçek test başlıyor. Hazır olduğunda
            başla butonuna tıkla.
          </p>
          <Separator className='my-5' />
          <div className='flex justify-center my-5'>
            <Button
              onClick={() => {
                setIsTraining(false);
                setTimer(0);
                nextRound();
              }}
            >
              Başla
            </Button>
          </div>
        </div>
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
