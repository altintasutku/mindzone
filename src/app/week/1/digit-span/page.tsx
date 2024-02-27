"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, DeleteIcon, RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { set } from "zod";

const SHOWING_TIME = 500;

const DigitspanPage = () => {
  const [randomNumber, setRandomNumber] = useState<number[]>([]);
  console.log("🚀 ~ DigitspanPage ~ randomNumber:", randomNumber);
  const [round, setRound] = useState<number>(0);

  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [activeShowingIndex, setActiveShowingIndex] = useState<number>(0);

  const [currentShowingNumber, setCurrentShowingNumber] = useState<
    number | null
  >(null);

  useEffect(() => {
    setRandomNumber([]);
    for (let i = 0; i < round + 1; i++) {
      const generatedNum = generateRandomNumber();
      setRandomNumber((prev) => [...prev, generatedNum]);
    }
  }, [round]);

  const handleStart = () => {
    setRound(1);
    setIsShowing(true);
    setActiveShowingIndex(0);
  };

  const handleNext = () => {
    if (round == 8) {
      setIsFinished(true);
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
    <div className="flex justify-center items-center h-96">
      {round === 0 ? (
        <div className="flex flex-col gap-5">
          <p>
            Bu egzersizde ekranda gördüğünüz sayıları ezberlemeye
            çalışacaksınız.
            <br />
            Tüm sayılar 0 ile 9 arasındadır.
            <br />
            Bu tür sayılara rakam diyoruz.
            <br />
            Birbiri ardına bir dizi rakam göreceksiniz.
            <br />
            Rakamları hatırladıktan sonra sizlerden o rakamları sırayla
            yazmanızı isteyeceğiz.
            <br />
            Ör. 1 – 2- 3- 4 = 1234 yazmanız gerekmektedir.
            <br />
            Tüm sayıları girdikten sonra “Devam” butonuna tıklayarak sonraki
            adıma geçeceksiniz.
            <br />
            Rakamları girdikten sonra yanıtınızın doğru olup olmadığı
            söylenecektir.
            <br />
            Hadi başlayalım!
          </p>
          <div className="flex justify-center">
            <Button onClick={handleStart}>Başlat</Button>
          </div>
        </div>
      ) : null}

      {isFinished ? (
        <div>
          <p>
            Tebrikler! Tüm raundları başarıyla tamamladınız.
            <br />
            Yeniden başlamak için &quot;Yeniden Başla&quot; butonuna tıklayın.
          </p>
          <Button onClick={handleStart}>Yeniden Başla</Button>
        </div>
      ) : isShowing ? (
        <span>{currentShowingNumber}</span>
      ) : round !== 0 ? (
        <NumPad
          randomNumber={randomNumber}
          handleNext={handleNext}
          handleStart={handleStart}
        />
      ) : null}
    </div>
  );
};

const NumPad = ({
  randomNumber,
  handleNext,
  handleStart,
}: {
  randomNumber: number[];
  handleNext: () => void;
  handleStart: () => void;
}) => {
  const [userInput, setUserInput] = useState<number[]>([]);

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
      toast({
        title: "Doğru!",
        description: "Cevabınız Doğru Tebrikler",
        duration: 3000,
        variant: "success",
      });
      handleNext();
    } else {
      toast({
        title: "Yanlış",
        description: "Tekrar deneyin",
        duration: 3000,
        variant: "destructive",
      });
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
        {userInput.map((num, index) => (
          <Button variant={"outline"} key={index}>
            {num}
          </Button>
        ))}
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
        <Button variant={"ghost"} onClick={resetHandle}>
          <RefreshCwIcon size={18} className="mr-0 sm:mr-2" />
          <span className="hidden sm:block">Sıfırla</span>
        </Button>
        <Button
          onClick={handleCheck}
          disabled={randomNumber.length !== userInput.length}
        >
          <CheckIcon size={18} className="mr-0 sm:mr-2" />
          <span className="hidden sm:block">Kontrol Et</span>
        </Button>
      </div>
    </div>
  );
};

const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};

export default DigitspanPage;
