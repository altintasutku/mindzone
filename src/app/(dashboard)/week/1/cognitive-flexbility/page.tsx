"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import IntroductionCF from "./_intorductions";
import { Progress } from "@/components/ui/progress";

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

const CORRECT_DURATION = 800;

const TOTAL_ROUNDS = 200;

const CognitiveFlexibilityPage = () => {
  const [correctState, setCorrectState] = useState<CorrectState>(
    CorrectState.None
  );

  const [currentItem, setCurrentItem] = useState<{
    item: string;
    box: number;
  } | null>(null);

  const [round, setRound] = useState(0);

  const handleNewRound = () => {
    if (round >= TOTAL_ROUNDS) {
      return setCurrentItem(null);
    } else {
      if (round <= 16) {
        setCurrentItem({
          item: randomAlphabet(),
          box: randomBox(1, 2),
        });
      } else if (round <= 32) {
        setCurrentItem({
          item: randomNumber().toString(),
          box: randomBox(3, 4),
        });
      } else {
        setCurrentItem({
          item: randomAlphabet() + randomNumber(),
          box: randomBox(),
        });
      }
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
    } else if (round <= 32) {
      if (ODD_NUMBERS.includes(currentItem.item[0]) && button === "X") {
        return correctAnswer();
      } else if (!ODD_NUMBERS.includes(currentItem.item[0]) && button === "Y") {
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
      {round >= TOTAL_ROUNDS ? (
        <FinishScreen url="/week/1/inhibition" />
      ) : !currentItem ? (
        <div>
          <IntroductionCF />

          <div className="flex justify-center items-center mt-5">
            <Button onClick={handleNewRound}>Devam</Button>
          </div>
        </div>
      ) : round === 1 ? (
        <div>
          <p className="pt-10">
            ŞİMDİ DAHA İYİ ANLAMAK İÇİN SADECE HARFLERİ DENEYELİM. SESSİZ HARF
            İSE X, SESLİ HARF İSE Y’YE BASIN.
          </p>
          <div className="flex justify-center items-center mt-5">
            <Button onClick={handleNewRound}>Başlat</Button>
          </div>
        </div>
      ) : round === 17 ? (
        <div>
          <p className="pt-10">
            ŞİMDİ DAHA İYİ ANLAMAK İÇİN SADECE SAYILARI DENEYELİM. TEK SAYI İSE
            X, ÇİFT SAYI İSE Y’YE BASIN.
          </p>
          <div className="flex justify-center items-center mt-5">
            <Button onClick={handleNewRound}>Başlat</Button>
          </div>
        </div>
      ) : round === 33 ? (
        <>
          <div>
            <p>
              Şimdi ikisi birlikte tekrar kuralı hatırlayalım.
              <br />
              Bu ekranda <strong>harflerin yukarıda</strong> olması,
              <strong>sayıların aşağıda</strong> olması gerekmektedir.
              <br />
              <strong>Sessiz harf ve tek sayı ise ise X</strong> butonuna
              basmanız gerekirken,
              <br />
              <strong>Sesli harf ve çift sayı ise Y</strong> butonuna basılması
              gerekmektedir.
              <br />
              Örn: G8 ekranda göründüğünde sol yukarıda ise X tuşuna
              basılacaktır. Sağ aşağıda görüldüyse bu sefer çift sayı 8 olduğu
              için ona odaklanılarak Y tuşuna basılacaktır.
            </p>
            <Separator className="my-5" />
            <div className="flex justify-center items-center">
              <Button onClick={handleNewRound}>Başlat</Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={cn(
              "grid grid-cols-2 grid-rows-2 divide-slate-200 min-h-40 w-full transition-all rounded-md overflow-hidden duration-100 ease-in-out border-2",
              {
                "border-green-500": correctState === CorrectState.Correct,
                "border-red-500": correctState === CorrectState.Incorrect,
              }
            )}
          >
            {[1, 2, 3, 4].map((ref, index) => (
              <div
                key={index}
                className="col-span-1 flex justify-center items-center text-xl border-2 border-slate-200"
              >
                {currentItem?.box === ref ? currentItem.item : ""}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
            <Button
              className="px-0 sm:px-20 py-5 text-xl font-bold text-white"
              onClick={() => handleButton("X")}
              disabled={correctState !== CorrectState.None}
            >
              X
            </Button>
            <Button
              className="px-0 sm:px-20 py-5 text-xl font-bold text-white"
              onClick={() => handleButton("Y")}
              disabled={correctState !== CorrectState.None}
            >
              Y
            </Button>
          </div>

          <Progress value={(100 * round) / TOTAL_ROUNDS}/>
        </>
      )}
    </div>
  );
};

const randomAlphabet = () => {
  return ALPABET[Math.floor(Math.random() * ALPABET.length)];
};

const randomBox = (min = 1, max = 4) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomNumber = () => {
  return Math.floor(Math.random() * 10);
};

export default CognitiveFlexibilityPage;
