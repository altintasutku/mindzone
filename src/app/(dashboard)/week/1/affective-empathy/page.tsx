"use client";
import React, { useEffect, useState } from "react";
import IntroductionCF from "./_intorductions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import FinishScreen from "@/components/game/FinishScreen";
import { Progress } from "@/components/ui/progress";
import { WeekData, sendWeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { getUser, updateUser } from "@/lib/api/user";
import { generateImages } from "@/assets/mockdata/weekGames/week1AffectiveEmpathy";
import { ZodUser } from "@/lib/validators/user";
import { useSendWeeklyData } from "@/hooks/useSendData";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/affective_emphaty/${src}.JPG`;
};

const MAX_ROUND = 120;

const AffectiveEmpathyPage = () => {
  const [round, setRound] = useState(0);
  const [, setImageString] = useState<string[]>([]);
  const [, setSelectedCheckboxes] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [samePerson, setSamePerson] = useState<string[]>([]);
  const [allRound1Images, setAllRound1Images] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState<boolean | null>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>();
  const [isFinished, setIsFinished] = useState(false);

  const session = useSession();

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 5,
    group: "W1",
  });

  const [timer, setTimer] = useState(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);

  const [temp, setTemp] = useState<NodeJS.Timeout | null>(null);
  const handleVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      if (timeout) {
        setTemp(timeout);
        clearInterval(timeout);
        setMyTimeout(null);
      }
    } else {
      if (!timeout && temp !== null) {
        setMyTimeout(
          setInterval(() => {
            setTimer((prev) => prev + 10);
          }, 10),
        );
      }
    }
  };

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
      false,
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
        false,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { send, isSending } = useSendWeeklyData();

  useEffect(() => {
    if (!isFinished) return;

    send(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    if (round >= MAX_ROUND) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const handleNext = () => {
    if (round >= MAX_ROUND) return;

    setAllRound1Images([]);
    setImageString([]);
    setSelectedCheckboxes([]);
    setSelectedImage("");
    setSamePerson([]);
    setIsGameStarted(false);
    setIsCorrect(null);

    setRound((prev) => prev + 1);
    selectImageFunction();

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10),
      );
    }
  };

  const handleImageClick = (clickedImage: string) => {
    setSelectedImage(clickedImage);
    if (clickedImage.slice(0, 10) === samePerson[0].slice(0, 10)) {
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setIsCorrect(true);
    } else {
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
      setIsCorrect(false);
    }
    setTimeout(handleNext, 1000);
  };

  const selectImageFunction = () => {
    let { allRound1Images, samePersonArray } = generateImages();
    setSamePerson(samePersonArray);
    setTimeout(() => {
      setIsGameStarted(true);
    }, 3000);
    setAllRound1Images(allRound1Images);
  };

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    setAllRound1Images((prev) => shuffleArray(prev));
  }, [round]);

  return (
    <div>
      {round >= MAX_ROUND ? (
        <FinishScreen isSending={isSending} url="/week/2/" />
      ) : round === 0 ? (
        <div className="flex flex-col items-center">
          <IntroductionCF />
          <Button onClick={handleNext} className="my-5">
            Hadi Başlayalım
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-10">
          <div className="min-h-72 flex flex-col justify-center items-center">
            {isCorrect === true ? (
              <p className=" text-green-600 text-5xl">Doğru</p>
            ) : isCorrect === false ? (
              <p className=" text-red-600 text-5xl">Yanlış</p>
            ) : isGameStarted === false ? (
              <Image
                className="rounded-md"
                width={200}
                height={270}
                alt={`${samePerson[0]}`}
                src={samePerson[0]}
                loader={imageLoader}
              />
            ) : (
              <div className="grid grid-cols-4 gap-y-4 gap-x-9 items-center justify-center">
                {allRound1Images.map((image, index) => (
                  <Image
                    className={`rounded-md cursor-pointer ${
                      selectedImage === image && "border-2 border-blue-500"
                    }`}
                    key={index}
                    width={180}
                    height={243}
                    alt={image}
                    src={image}
                    loader={imageLoader}
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
            )}
          </div>

          <Progress value={(round * 100) / MAX_ROUND} />
        </div>
      )}
    </div>
  );
};

export default AffectiveEmpathyPage;
