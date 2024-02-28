"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useRef, useState } from "react";

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

const CognitiveFlexibilityPage = () => {
  const itemEls = useRef<any>({});

  const [currentItem, setCurrentItem] = useState<{
    item: string;
    box: number;
  } | null>(null);

  useEffect(() => {
    for (const key in itemEls.current) {
      const element = itemEls.current[key];
      console.log(element);
    }
  }, [itemEls]);

  const handleNewRound = () => {
    setCurrentItem({
      item: randomAlphabet() + randomNumber(),
      box: randomBox(),
    });
  };

  const correctAnswer = () => {
    console.log("Correct");
    handleNewRound();
  };

  const incorrectAnswer = () => {
    console.log("Incorrect");
    handleNewRound();
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
      {!currentItem ? (
        <div>
          <p>
            Bu egzersizde ekranda harfler ve sayılar göreceksiniz. Takip etmeniz
            gereken birkaç kural belirledik ve bunlara göre yanıtlamanız
            gerekmektedir.
            <br />
            4’e bölünmüş ekran göreceksiniz.
            <br />
            Bu ekranda <strong>harflerin yukarıda</strong> olması,{" "}
            <strong>sayıların aşağıda</strong> olması gerekmektedir.
            <br />
            <strong>Sessiz harf ve tek sayı ise ise X</strong> butonuna basmanız
            gerekirken,
            <br />
            <strong>Sesli harf ve çift sayı ise Y</strong> butonuna basılması
            gerekmektedir.
            <br />
            <ul className="list-disc my-2">
              <li>
                Örn: G8 ekranda göründüğünde sol yukarıda ise X tuşuna
                basılacaktır. Sağ aşağıda görüldüyse bu sefer çift sayı 8 olduğu
                için ona odaklanılarak Y tuşuna basılacaktır.
              </li>
              <li>
                Ör: G8 sayısı üstte göründüyse harfe odaklanılacak ve X ye
                basılacaktır. Ama aşağıda görünürse çift sayı olduğu için Y
                basılacaktır.
              </li>
              <li>
                Tek harf örneği (15 Tane) ŞİMDİ DAHA İYİ ANLAMAK İÇİN SADECE
                HARFLERİ DENEYELİM. SESSİZ HARF İSE X, SESLİ HARF İSE Y’YE
                BASIN.
              </li>
              <li>
                Tek sayı örneği (15 Tane) ŞİMDİ DAHA İYİ ANLAMAK İÇİN SADECE
                SAYILARI DENEYELİM. TEK SAYI İSE X, ÇİFT SAYI İSE Y’YE BASIN.
              </li>
            </ul>
            Şimdi ikisi birlikte tekrar kuralı hatırlayalım.
            <br />
            Bu ekranda <strong>harflerin yukarıda</strong> olması,
            <strong>sayıların aşağıda</strong> olması gerekmektedir.
            <br />
            <strong>Sessiz harf ve tek sayı ise ise X</strong> butonuna basmanız
            gerekirken,
            <br />
            <strong>Sesli harf ve çift sayı ise Y</strong> butonuna basılması
            gerekmektedir.
            <br />
            Örn: G8 ekranda göründüğünde sol yukarıda ise X tuşuna basılacaktır.
            Sağ aşağıda görüldüyse bu sefer çift sayı 8 olduğu için ona
            odaklanılarak Y tuşuna basılacaktır.
          </p>

          <Separator className="my-5" />

          <div className="flex justify-center items-center">
            <Button onClick={handleNewRound}>Başla</Button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 grid-rows-2 dviide-slate-200 min-h-40 w-full">
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
            >
              X
            </Button>
            <Button
              className="px-0 sm:px-20 py-5 text-xl font-bold"
              onClick={() => handleButton("Y")}
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
