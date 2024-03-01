"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect } from "react";
import IntroductionTestThree from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

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

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }

    setRound((prev) => prev + 1);

    if (current === GO_NOGO.NONE)
      setCurrent(Math.random() > 0.5 ? GO_NOGO.GO : GO_NOGO.NOGO);
    else setCurrent(GO_NOGO.NONE);
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
    }
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen url="/test/4" />
      ) : round === 0 ? (
        <div>
          <IntroductionTestThree />
          <Separator className="my-5" />

          <div className="flex justify-center my-5">
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <div className="min-h-96 flex flex-col justify-center items-center">
          <div className="h-24">
            {current === GO_NOGO.GO ? (
              <div className="text-green-500 text-4xl flex justify-center items-center">
                Git
              </div>
            ) : current === GO_NOGO.NOGO ? (
              <div className="text-red-500 text-4xl flex justify-center items-center">
                Gitme
              </div>
            ) : (
              <span></span>
            )}
          </div>
          <Button className="px-10" onClick={handleClick} disabled={current === GO_NOGO.NONE}>
            GIT
          </Button>
          <Separator className="my-5" />
          <Progress value={(100 * round) / TOTAL_ROUNDS} showValue/>
        </div>
      )}
    </div>
  );
};

export default PerformanceTestPageThree;
