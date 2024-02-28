"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import IntroductionCF from "./_intorductions";

const ALPABET = [
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
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const VOWELS = ["A", "E", "I", "O", "U"];

const ODD_NUMBERS = ["1", "3", "5", "7", "9"];

enum CorrectState {
  Correct = "Correct",
  Incorrect = "Incorrect",
  None = "None",
}

const CORRECT_DURATION = 600;

const CognitiveFlexibilityPage = () => {
  const itemEls = useRef<any>({});

  const [correctState, setCorrectState] = useState<CorrectState>(
    CorrectState.None
  );

  const [currentItem, setCurrentItem] = useState<{
    item: string;
    box: number;
  } | null>(null);

  const [round, setRound] = useState(0);

  useEffect(() => {
    for (const key in itemEls.current) {
      const element = itemEls.current[key];
      console.log(element);
    }
  }, [itemEls]);

  const handleNewRound = () => {
    if (round >= 10) {
      return setCurrentItem(null);
    } else {
      setCurrentItem({
        item: randomAlphabet() + randomNumber(),
        box: randomBox(),
      });
      setRound((prev) => prev + 1);
    }
  };

  const correctAnswer = () => {
    setCorrectState(CorrectState.Correct);
    setTimeout(() => {
      setCorrectState(CorrectState.None);
      handleNewRound();
    }, CORRECT_DURATION);
  };

  const incorrectAnswer = () => {
    setCorrectState(CorrectState.Incorrect);
    setTimeout(() => {
      setCorrectState(CorrectState.None);
      handleNewRound();
    }, CORRECT_DURATION);
  };

  const handleButton = (button: "X" | "Y") => {
    if (!currentItem) return;

    if (currentItem?.box === 1 || currentItem?.box === 2) {
      if (!VOWELS.includes(currentItem.item[0]) && button === "X") {
        return correctAnswer();
      } else if (VOWELS.includes(currentItem.item[0]) && button === "Y") {
        return correctAnswer();
      }
    } else {
      if (ODD_NUMBERS.includes(currentItem.item[1]) && button === "X") {
        return correctAnswer();
      } else if (!ODD_NUMBERS.includes(currentItem.item[0]) && button === "Y") {
        return correctAnswer();
      }
    }

    incorrectAnswer();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {round >= 10 ? (
        <FinishScreen url="/week/1/inhibition" />
      ) : !currentItem ? (
        <div>
          <IntroductionCF />
          <Separator className="my-5" />

          <div className="flex justify-center items-center">
            <Button onClick={handleNewRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "grid grid-cols-2 grid-rows-2 dviide-slate-200 min-h-40 w-full transition-all duration-100 ease-in-out",
              {
                "border-2 border-green-500":
                  correctState === CorrectState.Correct,
                "border-2 border-red-500":
                  correctState === CorrectState.Incorrect,
              }
            )}
          >
            {[1, 2, 3, 4].map((ref, index) => (
              <div
                key={index}
                ref={(element) => (itemEls.current[index] = element)}
                className="col-span-1 flex justify-center items-center text-xl border-2 border-slate-200"
              >
                {currentItem?.box === ref ? currentItem.item : ""}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Button
              className="px-0 sm:px-20 py-5 text-xl font-bold"
              onClick={() => handleButton("X")}
              disabled={correctState !== CorrectState.None}
            >
              X
            </Button>
            <Button
              className="px-0 sm:px-20 py-5 text-xl font-bold"
              onClick={() => handleButton("Y")}
              disabled={correctState !== CorrectState.None}
            >
              Y
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const randomAlphabet = () => {
  return ALPABET[Math.floor(Math.random() * ALPABET.length)];
};

const randomBox = () => {
  return Math.floor(Math.random() * 4) + 1;
};

const randomNumber = () => {
  return Math.floor(Math.random() * 10);
};

export default CognitiveFlexibilityPage;
