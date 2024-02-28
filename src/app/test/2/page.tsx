"use client";
import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import IntroductionsTestTwo from "./_introductions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { EyeIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { set } from "zod";
import { cn } from "@/lib/utils";

const TOTAL_ROUNDS = 450;

const time = 2000;

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "O",
  "P",
  "R",
  "S",
  "T",
];

const PerformanceTestPageTwo = () => {
  const [round, setRound] = React.useState<number>(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState<
    [string, string, string]
  >(["", "", ""]);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [correctsInTest, setCorrectsInTest] = useState<number>(0);
  const [correctState, setCorrectState] = useState<boolean | null>(false);

  // const { toast } = useToast();

  // const correctToats = () => {
  //   toast({
  //     title: "Doğru Cevap",
  //     description: "Tebrikler! doğru yanıtladınız.",
  //     variant: "success",
  //     duration: 2000,
  //   });
  // };

  // const wrongToats = () => {
  //   toast({
  //     title: "Yanlış Cevap",
  //     description: "Üzgünüz! yanlış yanıtladınız.",
  //     variant: "destructive",
  //     duration: 2000,
  //   });
  // };

  useEffect(() => {
    if (selectedLetters[0] === selectedLetters[2]) {
      setCorrectsInTest((prev) => prev + 1);
    }
  }, [selectedLetters]);

  const nextRound = () => {
    if (round >= TOTAL_ROUNDS) {
      setIsFinished(true);
    } else {
      setRound((prev) => prev + 1);
      setCorrectState(null);
      const randomLetter = selectRandomLetter();
      setSelectedLetters((prev) => [prev[1], prev[2], randomLetter]);

      // setTimeout(() => {
      //   nextRound();
      // }, 1);
    }
  };

  useEffect(() => {
    if (round === 0) {
      return;
    }
    const timer = setTimeout(() => {
      nextRound();
    }, time);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const selectRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * LETTERS.length);
    const randomLetter = LETTERS[randomIndex];

    return randomLetter;
  };

  const checkAnswer = () => {
    if (selectedLetters[0] === selectedLetters[2]) {
      // correctToats();
      setCorrectState(true);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      // wrongToats();
      setCorrectState(false);
      setWrongAnswers((prev) => prev + 1);
    }
  };

  return (
    <div className='flex flex-col items-center py-10'>
      {isFinished ? (
        <FinishScreen url='/test/3' />
      ) : round === 0 ? (
        <div className='flex flex-col'>
          <IntroductionsTestTwo />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button onClick={nextRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <div className='flex flex-col gap-7 justify-center items-center'>
          <div>
            <p className=' text-4xl'>{selectedLetters[1]}</p>
          </div>
          <div className=' w-full'>
            <Button
              className={cn("w-full ", {
                "bg-green-500 hover:bg-green-500": correctState === true,
                "bg-red-500 hover:bg-red-500": correctState === false,
                "": correctState === null,
              })}
              variant={"outline"}
              onClick={checkAnswer}
            >
              <EyeIcon />
            </Button>
          </div>
          <div className='w-40'>
            <Progress
              max={round}
              indicatorColor='bg-blue-500'
              className='h-2 text-yellow-300'
              value={round}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTestPageTwo;
