"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";
import IntroductionInh from "./_introductions";

type Color = {
  name: string;
  textColor: string;
};

const colors: Color[] = [
  { name: "YEŞIL", textColor: "text-yellow-400" },
  { name: "MAVİ", textColor: "text-green-400" },
  { name: "KIRMIZI", textColor: "text-blue-400" },
  { name: "SARI", textColor: "text-red-400" },
  { name: "MOR", textColor: "text-pink-400" },
  { name: "PEMBE", textColor: "text-orange-400" },
];

enum CorrectState {
  Correct = "Correct",
  Incorrect = "Incorrect",
  None = "None",
}

const CORRECT_DURATION = 600;

const answers = [
  { color: "green", text: "Yeşil" },
  { color: "blue", text: "Mavi" },
  { color: "red", text: "Kırmızı" },
  { color: "yellow", text: "Sarı" },
  { color: "pink", text: "Pembe" },
  { color: "orange", text: "Turuncu" },
];

const InhibitionPage = () => {
  const [round, setRound] = useState<number>(0);

  const [currentColor, setCurrentColor] = useState<Color | null>(null);

  const [correctState, setCorrectState] = useState<CorrectState>(
    CorrectState.None
  );

  const { toast } = useToast();

  const handleNext = () => {
    if (round >= 10) {
      toast({
        title: "Oyun Bitti",
        description: "Oyun bitti.",
        variant: "success",
      });
      setCurrentColor(null);
      return;
    } else {
      setRound((prev) => prev + 1);
      setCurrentColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  };

  const handleAnswer = (color: string) => {
    if (currentColor) {
      if (currentColor.textColor.includes(color)) {
        setCorrectState(CorrectState.Correct);
        setTimeout(() => {
          setCorrectState(CorrectState.None);
          handleNext();
        }, CORRECT_DURATION);
      } else {
        setCorrectState(CorrectState.Incorrect);
        setTimeout(() => {
          setCorrectState(CorrectState.None);
          handleNext();
        }, CORRECT_DURATION);
      }
    }
  };

  return (
    <div>
      {round >= 10 ? (
        <FinishScreen url="/week/1/director-task" />
      ) : round === 0 ? (
        <div className="flex flex-col">
          <IntroductionInh />
          <Separator className="my-5" />

          <div className="flex justify-center my-5">
            <Button onClick={handleNext}>Başla</Button>
          </div>
        </div>
      ) : currentColor ? (
        <div className="flex flex-col items-center py-16">
          {correctState === CorrectState.None ? (
            <span
              className={`text-4xl mb-14 font-bold ${currentColor.textColor}`}
            >
              {currentColor.name}
            </span>
          ) : correctState === CorrectState.Correct ? (
            <span className={`text-4xl mb-14 font-bold text-green-400`}>
              <CheckIcon size={32} />
            </span>
          ) : (
            <span className={`text-4xl mb-14 font-bold text-red-400`}>
              <XCircleIcon size={32} />
            </span>
          )}
          <div className="flex flex-col sm:flex-row w-full justify-center gap-1 sm:gap-4">
            {answers.map((answer) => (
                <Button
                    key={answer.color}
                    className="shadow"
                    variant={"secondary"}
                    onClick={() => handleAnswer(answer.color)}
                >
                    {answer.text}
                </Button>
                
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-4xl font-bold">Hazırlanıyor...</p>
        </div>
      )}
    </div>
  );
};

export default InhibitionPage;
