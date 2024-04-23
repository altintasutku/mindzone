"use client";

import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import IntroductionTestThree from "./_introductions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { sendWeekData, WeekData } from "@/lib/api/week";
import Image from "next/image";
import { ZodUser } from "@/lib/validators/user";

enum GO_NOGO {
  GO = "GO",
  NOGO = "NOGO",
  NONE = "NONE",
}

const REACTION_TIME = 1000;

const TOTAL_ROUNDS = (15 * 60) / (REACTION_TIME / 1000 + 0.5);
const TRAINING_ROUNDS = 20;

const WeekFourGameThreePage = () => {
  const { toast } = useToast();

  const [current, setCurrent] = React.useState<GO_NOGO>(GO_NOGO.NONE);

  const [imageMode, setImageMode] = useState<"positive" | "negative" | null>(
    null
  );

  const [imageIndex, setImageIndex] = useState<number | null>(null);

  const [corrects, setCorrects] = useState<number>(0);

  const [round, setRound] = React.useState(0);

  const [isFinished, setIsFinished] = React.useState(false);

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

  const session = useSession();
  const router = useRouter();

  const [isTraining, setIsTraining] = useState(true);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 18,
    group: "W1",
  });

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
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }

    setRound((prev) => prev + 1);

    setImageMode(null);
    setImageIndex(null);

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
        nextRound();
      },
      current === GO_NOGO.NONE ? 500 : REACTION_TIME
    );
    selectImage();

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(
    () => {
      if (!isFinished) {
        return;
      }
      mutate(stats);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFinished]
  );

  const selectImage = () => {
    if (current === GO_NOGO.GO) {
      setImageMode("positive");
      setImageIndex(Math.floor(Math.random() * 16) + 1);
    }
    if (current === GO_NOGO.NOGO) {
      setImageMode("negative");
      setImageIndex(Math.floor(Math.random() * 40) + 1);
    }
  };

  const handleClick = () => {
    if (current === GO_NOGO.GO) {
      setCorrects((prev) => prev + 1);
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      nextRound();
    } else {
      toast({
        title: "Hatalı!",
        description: "Olumsuz bir duyguda butona bastın!",
        variant: "destructive",
        duration: REACTION_TIME,
      });
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
    }
  };

  const imageLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/inhibition/${src}.jpg`;
  };

  return (
    <div>
      {isFinished ? (
        <div className='flex justify-center items-center'>
          <FinishScreen url='/week/4/cognitive-emphaty' />
        </div>
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
                setStats((prev) => ({
                  ...prev,
                  totalErrorCount: 0,
                  totalAccuracy: 0,
                }));
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
          {imageMode === null ? (
            <div className=' h-[275px]'></div>
          ) : (
            <Image
              width={200}
              height={200}
              alt='image'
              loader={imageLoader}
              src={`${imageMode}/${imageIndex}`}
            />
          )}
          <Button
            className='px-10 my-5'
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

export default WeekFourGameThreePage;
