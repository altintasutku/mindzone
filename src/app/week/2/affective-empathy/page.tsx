"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import IntroductionCF from "../working-memory/_introductions";
import { Button } from "@/components/ui/button";

type ImageFolder = {
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
};

type Question = {
  difficulty: string;
  index: number;
  imageFolder: ImageFolder;
};

const diffiulties = {
  easy: 20,
  medium: 20,
  hard: 20,
};

const allData: Question[] = [
  ...Array.from({ length: diffiulties.easy }).map((_, index) => {
    return {
      difficulty: "difficulty1",
      index: index + 1,
      imageFolder: {
        image1: "1",
        image2: "2",
        image3: "3",
        image4: "main",
        image5: "true",
      },
    };
  }),
  ...Array.from({ length: diffiulties.medium }).map((_, index) => {
    return {
      difficulty: "difficulty2",
      index: index + 1,
      imageFolder: {
        image1: "1",
        image2: "2",
        image3: "3",
        image4: "main",
        image5: "true",
      },
    };
  }),
  ...Array.from({ length: diffiulties.hard }).map((_, index) => {
    return {
      difficulty: "difficulty3",
      index: index + 1,
      imageFolder: {
        image1: "1",
        image2: "2",
        image3: "3",
        image4: "main",
        image5: "true",
      },
    };
  }),
];

const imageLoader = ({ src }: { src: string }): string => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/${src}.jpg`;
};

const Week2Game5Page = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [current, setCurrent] = useState<Question>();
  const [isModeEmotion, setIsModeEmotion] = useState<boolean | null>(null);

  const handleNext = () => {
    setRound((prev) => prev + 1);

    setCurrent(allData[round]);
  };

  const handleCheck = (item: string) => {
    if (item === "true") {
      setIsCorrect(true);
      setTimeout(() => {
        handleNext();
      }, 1000);
    } else {
      setIsCorrect(false);
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  };

  useEffect(() => {
    if (round === allData.length) {
      setIsFinished(true);
    }
    if (round === 21) {
      setIsModeEmotion(true);
    }
    setIsCorrect(null);
    setCurrent(allData[round]);
  }, [round]);

  return (
    <div>
      {isFinished ? (
        <p>Finished</p>
      ) : round === 0 ? (
        <div>
          <IntroductionCF />

          <div className='flex justify-center items-center mt-5'>
            <Button onClick={handleNext}>Devam</Button>
          </div>
        </div>
      ) : isCorrect === true ? (
        <div className='flex justify-center text-3xl text-green-600'>Doğru</div>
      ) : isCorrect === false ? (
        <div className='flex justify-center text-3xl text-red-600'>Yanlış</div>
      ) : isModeEmotion === true ? (
        <div className=' flex flex-col items-center'>
          <p>
            Ekranda her soru için bir yüz fotoğrafı göreceksiniz. Sizlerden bu
            fotoğraf aynı duygu olan kişiyle eşleştirmenizi istiyoruz.
          </p>
          <Button onClick={() => setIsModeEmotion(false)}>Devam</Button>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center '>
          <div>
            <Image
              src={`affective-emphaty/${current?.difficulty}/${current?.index}/${current?.imageFolder.image4}`}
              loader={imageLoader}
              alt='image3'
              width={200}
              height={200}
              className='mx-2 rounded-md'
            />
          </div>
          <div className='flex flex-row flex-wrap my-5'>
            {current?.imageFolder &&
              Object.entries(current.imageFolder)
                .sort(() => Math.random() - 0.5)
                .map(([key, image], index) => {
                  if (key !== "image4") {
                    return (
                      <Image
                        key={index}
                        src={`affective-emphaty/${current?.difficulty}/${current?.index}/${image}`}
                        loader={imageLoader}
                        alt={`image${index + 1}`}
                        width={150}
                        height={150}
                        className='rounded-md mx-1'
                        onClick={() => handleCheck(image)}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Week2Game5Page;
