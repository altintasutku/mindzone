"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CheckIcon, XCircle, XCircleIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

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
    <div className="flex flex-col items-center gap-5">
      {round >= 10 ? (
        <div>
          <p>
            <strong>Tebrikler!</strong> Egzersizi tamamladınız.
            <br />
            Bir sonraki egzersize geçebilirsiniz.
          </p>
          <Button asChild className="my-3">
            <Link href="/week/1/director-task">Sonraki Egzersize Geç</Link>
          </Button>
        </div>
      ) : round === 0 ? (
        <div className="flex flex-col">
          <p>
            Şimdi size bazı kelimeler göstereceğiz.  &apos;Başlayın&apos;
            dedikten hemen sonra, sizden, bu kartlarda yazılı olan kelimelerin
            hangi renkte yazıldığını aşağıdaki butona bakarak olabildiğince
            hızlı yanıtlamanız gerekmektedir.
            <br />
            Renk ve kelimeler uyumsuz olduğunda cevap vermek zor olabilir, o
            yüzden odaklanarak dikkatli ve hızlı yanıtlamaya çalışın.
            <br />
          </p>
          <ul>
            <li className="text-yellow-400">
              YEŞİL - (sarı)’ya tıklamanız gerekmektedir.
            </li>
            <li className="text-green-400">
              MAVİ – (yeşil)’e tıkmalamanız gerekmektedir.
            </li>
            <li className="text-blue-400">
              KIRMIZI – Maviye tıklamanız gerekmektedir.{" "}
            </li>
            <li className="text-red-400">
              SARI - (kırmızıya) tıklamanız gerekmektedir.{" "}
            </li>
            <li className="text-pink-400">
              MOR – pembe ye tıklaması gerekmektedir.
            </li>
            <li className="text-orange-400">
              PEMBE - turuncuya tıklaması gerekmektedir
            </li>
          </ul>
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
            <Button
              className="shadow"
              variant={"secondary"}
              onClick={() => handleAnswer("green")}
            >
              Yeşil
            </Button>
            <Button
              className="shadow"
              variant={"secondary"}
              onClick={() => handleAnswer("blue")}
            >
              Mavi
            </Button>
            <Button
              className="shadow"
              variant={"secondary"}
              onClick={() => handleAnswer("red")}
            >
              Kırmızı
            </Button>
            <Button
              className="shadow"
              variant={"secondary"}
              onClick={() => handleAnswer("yellow")}
            >
              Sarı
            </Button>
            <Button
              className="shadow"
              variant={"secondary"}
              onClick={() => handleAnswer("pink")}
            >
              Pembe
            </Button>
            <Button
              className="shadow"
              variant={"secondary"}
              onClick={() => handleAnswer("orange")}
            >
              Turuncu
            </Button>
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
