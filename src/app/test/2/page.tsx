"use client";
import FinishScreen from "@/components/game/FinishScreen";
import React, { useEffect, useState } from "react";
import IntroductionsTestTwo from "./_introductions";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { EyeIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  // "I",
  // "J",
  // "K",
  // "L",
  // "M",
  // "O",
  // "P",
  // "R",
  // "S",
  // "T",
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

  const { toast } = useToast();

  const correctToats = () => {
    toast({
      title: "Correct Answer",
      description: "You have answered correctly.",
      variant: "success",
      duration: 2000,
    });
  };

  const wrongToats = () => {
    toast({
      title: "Wrong Answer",
      description: "You have answered wrong.",
      variant: "destructive",
      duration: 2000,
    });
  };

  useEffect(() => {
    if (selectedLetters[0] === selectedLetters[2]) {
      setCorrectsInTest((prev) => prev + 1);
    }
  }, [selectedLetters]);

  const nextRound = () => {
    if (round === 450) {
      setIsFinished(true);
    } else {
      setRound((prev) => prev + 1);
      const randomLetter = selectRandomLetter();
      setSelectedLetters((prev) => [prev[1], prev[2], randomLetter]);

      setTimeout(() => {
        nextRound();
      }, 2000);
    }
  };

  const selectRandomLetter = () => {
    const randomIndex = Math.floor(Math.random() * LETTERS.length);
    const randomLetter = LETTERS[randomIndex];

    return randomLetter;
  };

  const checkAnswer = () => {
    if (selectedLetters[0] === selectedLetters[2]) {
      correctToats();
      setCorrectAnswers((prev) => prev + 1);
    } else {
      wrongToats();
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
          <div>{selectedLetters[1]}</div>
          <div>
            <Button variant={"outline"} onClick={checkAnswer}>
              <EyeIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerformanceTestPageTwo;
