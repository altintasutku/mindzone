"use client";
import FinishScreen from "@/components/game/FinishScreen";
import React, { use, useEffect, useState } from "react";
import WeekFourGameFiveIntroductions from "./_introductions";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";
import { week4Game5Questions } from "@/assets/mockdata/weekGames/week4game5data";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { WeekData } from "@/lib/api/week";
import { useSendWeeklyData } from "@/hooks/useSendData";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_four/affective-emphaty/${src}.JPG`;
};

const WeekFourGameFivePage = () => {
  const { toast } = useToast();

  const TOTAL_ROUNDS = week4Game5Questions.length;

  const CORRECT_DURATION = 1000;

  const image = ["1", "2", "3", "4"];

  const [isFinished, setIsFinished] = useState(false);
  const [round, setRound] = useState(0);

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 20,
    group: "W1",
  });

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

  const { send, isSending } = useSendWeeklyData();

  const handleNext = () => {
    if (round === TOTAL_ROUNDS) {
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
  };

  const handleSelect = (image: string) => {
    if (week4Game5Questions[round - 1].answer === image) {
      toast({
        title: "Doğru Cevapladınız!",
        variant: "success",
        duration: 1000,
      });
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      handleNext();
    } else {
      toast({
        title: "Yanlış Cevapladınız!",
        variant: "destructive",
        duration: 1000,
      });
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
      handleNext();
    }
  };

  useEffect(() => {
    if (round === TOTAL_ROUNDS) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (!isFinished) return;

    send(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  return (
    <div>
      {isFinished ? (
        <div className='flex justify-center items-center'>
          <FinishScreen isSending={isSending} url='/week/5/' />
        </div>
      ) : round === 0 ? (
        <div>
          <WeekFourGameFiveIntroductions />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={handleNext}>Başla</Button>
          </div>
        </div>
      ) : (
        <>
          <p>{week4Game5Questions[round - 1].question}</p>
          <div className='flex flex-row justify-center mt-9'>
            {image.map((item, index) => (
              <div key={index} className='mx-2'>
                <Image
                  onClick={() => handleSelect(item)}
                  className=' rounded-lg'
                  src={`${round}/${item}`}
                  loader={imageLoader}
                  alt='image'
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeekFourGameFivePage;
