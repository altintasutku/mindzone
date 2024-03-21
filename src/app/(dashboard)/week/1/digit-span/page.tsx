"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, DeleteIcon, RefreshCwIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import IntroductionDS from "./_introductions";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { WeekData, sendWeekData } from "@/lib/api/week";
import { useUserStore } from "@/hooks/useUserStore";
import { useSession } from "next-auth/react";
import { updateUser } from "@/lib/api/user";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const SHOWING_TIME = 500;

const MAX_ROUNDS = 8;

const DigitspanPage = () => {
  const [randomNumber, setRandomNumber] = useState<number[]>([]);
  const [round, setRound] = useState<number>(0);

  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [activeShowingIndex, setActiveShowingIndex] = useState<number>(0);

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [reactionTime, setReactionTime] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
  const [currentShowingNumber, setCurrentShowingNumber] = useState<
    number | null
  >(null);

  useEffect(() => {
    setRandomNumber([]);
    for (let i = 0; i < Math.ceil(round / 10) + 1; i++) {
      const generatedNum = generateRandomNumber();
      setRandomNumber((prev) => [...prev, generatedNum]);
    }
  }, [round]);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 1,
    group: "W1",
  });

  const { mutate } = useMutation({
    mutationFn: async (data: WeekData) => {
      if (!session.data || !user) return;

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
      setUser({
        ...user,
        userDetails: {
          ...user.userDetails,
          WeeklyStatus: parseInt(user.userDetails.WeeklyStatus) + 1 + "",
        },
      });
    },
  });

  useEffect(() => {
    if (!isFinished) return;

    mutate(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleStart = () => {
    setRound(1);
    setIsShowing(true);
    setActiveShowingIndex(0);
    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setReactionTime((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleNext = () => {
    if (round == MAX_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: reactionTime,
      }));
      setIsFinished(true);
      clearInterval(timeout!);
    } else {
      setRound((prev) => prev + 1);
      setIsShowing(true);
      setActiveShowingIndex(0);
    }
  };

  useEffect(() => {
    if (isShowing) {
      const timer = setTimeout(() => {
        if (currentShowingNumber === null) {
          setActiveShowingIndex((prev) => prev + 1);
          if (activeShowingIndex === randomNumber.length) {
            setIsShowing(false);
          }
          setCurrentShowingNumber(randomNumber[activeShowingIndex]);
        } else {
          setCurrentShowingNumber(null);
        }
      }, SHOWING_TIME);
      return () => clearTimeout(timer);
    }
  }, [
    activeShowingIndex,
    currentShowingNumber,
    isShowing,
    randomNumber,
    randomNumber.length,
  ]);

  return (
    <div className="flex justify-center items-center min-h-96">
      {round === 0 ? (
        <div className="flex flex-col gap-5">
          <IntroductionDS />
          <Separator className="my-5" />

          <div className="flex justify-center">
            <Button onClick={handleStart}>Başlat</Button>
          </div>
        </div>
      ) : null}

      {isFinished ? (
        <FinishScreen url="/week/1/cognitive-flexibility" />
      ) : isShowing ? (
        <span>{currentShowingNumber}</span>
      ) : round !== 0 ? (
        <NumPad
          randomNumber={randomNumber}
          handleNext={handleNext}
          handleStart={handleStart}
          setStats={setStats}
        />
      ) : null}
    </div>
  );
};

const CORRECT_DURATION = 1000;

const NumPad = ({
  randomNumber,
  handleNext,
  handleStart,
  setStats,
}: {
  randomNumber: number[];
  handleNext: () => void;
  handleStart: () => void;
  setStats: React.Dispatch<React.SetStateAction<WeekData>>;
}) => {
  const [userInput, setUserInput] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const { toast } = useToast();

  const handleInput = (num: number) => {
    if (userInput.length !== randomNumber.length) {
      setUserInput((prev) => [...prev, num]);
    }
  };

  const handleDelete = () => {
    setUserInput((prev) => prev.slice(0, prev.length - 1));
  };

  const handleCheck = () => {
    const isCorrect = userInput.join("") === randomNumber.join("");
    if (isCorrect) {
      setIsCorrect(true);
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setTimeout(() => {
        setIsCorrect(null);
        handleNext();
      }, CORRECT_DURATION);
    } else {
      setIsCorrect(false);
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
      setTimeout(() => {
        setIsCorrect(null);
        handleNext();
      }, CORRECT_DURATION);
    }
  };

  const resetHandle = () => {
    toast({
      title: "Yeniden Başladınız",
      description: "Oyuna baştan başladınız",
      duration: 3000,
    });
    handleStart();
  };

  return (
    <div>
      <div className="flex items-center justify-center mb-6 gap-2">
        {isCorrect === null ? (
          userInput.map((num, index) => (
            <Button variant={"outline"} key={index}>
              {num}
            </Button>
          ))
        ) : isCorrect ? (
          <span className="text-green-500">Doğru</span>
        ) : (
          <span className="text-red-500">Yanlış</span>
        )}
      </div>

      <Separator className="my-6" />

      <div className="grid grid-cols-3 gap-4 justify-center">
        <Button variant={"outline"} onClick={() => handleInput(1)}>
          1
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(2)}>
          2
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(3)}>
          3
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(4)}>
          4
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(5)}>
          5
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(6)}>
          6
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(7)}>
          7
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(8)}>
          8
        </Button>
        <Button variant={"outline"} onClick={() => handleInput(9)}>
          9
        </Button>
        <span></span>
        <Button variant={"outline"} onClick={() => handleInput(0)}>
          0
        </Button>
        <span></span>
      </div>

      <div className="grid grid-cols-3 justify-between my-4 gap-9 items-center">
        <Button variant={"destructive"} onClick={handleDelete}>
          <DeleteIcon size={18} className="mr-0 sm:mr-2" />
          <span className="hidden sm:block">Sil</span>
        </Button>
        <Dialog>
          <DialogTrigger
            className={cn(buttonVariants({ variant: "ghost" }), "mr-0 sm:mr-2")}
          >
            <RefreshCwIcon size={18} />
            <span className="hidden sm:block">Sıfırla</span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Emin misin?</DialogTitle>
              <DialogDescription>
                Bu işlem oyununuzu sıfırlayacak ve tüm ilerlemeniz baştan
                başlayacaktır. Emin misiniz?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button">İptal</Button>
              </DialogClose>
              <Button type="button" variant={"secondary"} onClick={resetHandle}>
                Evet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Button
          onClick={handleCheck}
          disabled={randomNumber.length !== userInput.length}
        >
          <CheckIcon size={18} className="mr-0 sm:mr-2" />
          <span className="hidden sm:block">Kontrol Et</span>
        </Button>
      </div>

      <Progress
        className="mt-10"
        value={(100 * (randomNumber.length - 1)) / 80}
        showValue
      />
    </div>
  );
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};

export default DigitspanPage;
