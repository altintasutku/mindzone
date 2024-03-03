"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import IntroductionTestFour from "./_introductions";
import { Separator } from "@/components/ui/separator";
import FinishScreen from "@/components/game/FinishScreen";
import { Progress } from "@/components/ui/progress";
import { CheckCheckIcon } from "lucide-react";

type CurrentModType = {
  mod: "negative" | "notr" | "positive";
  index: number;
};

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/test_four_images/${src}.JPG`;
};

const optionsImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/test_four_images/${src}.png`;
};

const TOTAL_ROUNDS = 30;

const DURATION = 1200;

// 'string'ler duyguları, 'number'lar ise kaç tane fotoğrafı olduğunu belirtir.
// örn: negatif duygular için elimizde 18 fotoğraf var.
const mods: Record<string, number> = { negative: 18, notr: 4, positive: 8 };

// tüm modları birleştirip karıştırıyoruz.
const allMods: CurrentModType[] = [
  ...Array.from({ length: mods["negative"] }).map((_, index): CurrentModType => ({
    mod: "negative",
    index: index + 1,
  })),
  ...Array.from({ length: mods["notr"] }).map((_, index): CurrentModType => ({
    mod: "notr",
    index: index + 1,
  })),
  ...Array.from({ length: mods["positive"] }).map((_, index): CurrentModType => ({
    mod: "positive",
    index: index + 1,
  })),
].sort(() => Math.random() - 0.5);

const PerformanceTestPageFour = () => {
  const [round, setRound] = useState(0);

  const [currentMod, setCurrentMod] = useState<CurrentModType | null>({
    mod: "negative",
    index: 0,
  });

  const [isFinished, setIsFinished] = useState(false);

  const handleNext = () => {
    if (round === TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }

    setCurrentMod(null);

    setTimeout(() => {
      console.log(round);

      setCurrentMod(allMods[round]);
      setRound((prev) => prev + 1);
    }, DURATION);
  };

  const handleOption = (option: number) => {
    handleNext();
  };

  return (
    <div className="flex flex-col items-center gap-5">
      {isFinished ? (
        <FinishScreen url="/test/5" />
      ) : round === 0 ? (
        <>
          <IntroductionTestFour />
          <Separator className="my-4" />
          <Button onClick={handleNext}>Başla</Button>
        </>
      ) : (
        <>
          <div className="h-[400px] flex justify-center items-center">
            {currentMod ? (
              <Image
                loader={imageLoader}
                src={`${currentMod?.mod}/${currentMod?.index}`}
                alt={`modImage`}
                height={300}
                width={300}
                className="rounded-md"
              />
            ) : (
              <div className="flex flex-col items-center animate-ping delay-200">
                <CheckCheckIcon size={50} />
                <p>Cevabın Kaydedildi!</p>
              </div>
            )}
          </div>
          <div className="grid grid-cols-3 sm:flex">
            {Array.from({ length: 9 }).map((_, index) => (
              <div
                key={index}
                className="text-center cursor-pointer hover:bg-slate-100 p-1 rounded-md"
                onClick={() => {
                  if (currentMod) handleOption(index + 1);
                }}
              >
                <Image
                  loader={optionsImageLoader}
                  alt={(index + 1).toString()}
                  src={`points/${index + 1}`}
                  width={50}
                  height={50}
                  className="rounded-sm"
                />
                {index + 1}
              </div>
            ))}
          </div>
          <Progress value={(100 * round) / TOTAL_ROUNDS} showValue />
        </>
      )}
    </div>
  );
};

export default PerformanceTestPageFour;
