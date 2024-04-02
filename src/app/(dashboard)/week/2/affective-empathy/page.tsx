"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import IntroductionCF from "../working-memory/_introductions";
import { Button } from "@/components/ui/button";
import WeekTwoGameFourIntroductions from "./_introductions";
import { useMutation } from "@tanstack/react-query";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { updateUser } from "@/lib/api/user";
import { useUserStore } from "@/hooks/useUserStore";
import { useSession } from "next-auth/react";

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
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/${src}.JPG`;
};

const Week2Game5Page = () => {
  const [round, setRound] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [current, setCurrent] = useState<Question>();
  const [isModeEmotion, setIsModeEmotion] = useState<boolean | null>(null);

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 10,
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

  const { mutate } = useMutation({
    mutationFn: async (data: WeekData) => {
      if (!session.data || !user) return;

      await sendWeekData(data, session.data.user.accessToken);

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            WeeklyStatus: parseInt(user.userDetails.WeeklyStatus) + 1 + "",
          },
        },
      });

      setUser({
        ...user,
        userDetails: {
          ...user.userDetails,
          WeeklyStatus: parseInt(user.userDetails.WeeklyStatus) + 1 + "",
        },
      });
    },
  });

  useEffect(() => {
    if (isFinished) {
      mutate(stats);
      clearInterval(timeout!);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, isFinished]);

  const handleNext = () => {
    if (round >= allData.length) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
    }
    setRound((prev) => prev + 1);

    setCurrent(allData[round]);

    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10),
      );
    }
  };

  const handleCheck = (item: string) => {
    if (item === "true") {
      setIsCorrect(true);
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setTimeout(() => {
        handleNext();
      }, 1000);
    } else {
      setIsCorrect(false);
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
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
    <div className="text-lg font-semibold">
      5. egzersiz çalışma altında. Beklediğiniz için teşekkürler.
    </div>
  );

  // return (
  //   <div>
  //     {isFinished ? (
  //       <p>Finished</p>
  //     ) : round === 0 ? (
  //       <div>
  //         <WeekTwoGameFourIntroductions />
  //
  //         <div className="flex justify-center items-center mt-5">
  //           <Button onClick={handleNext}>Devam</Button>
  //         </div>
  //       </div>
  //     ) : isCorrect === true ? (
  //       <div className="flex justify-center text-3xl text-green-600">Doğru</div>
  //     ) : isCorrect === false ? (
  //       <div className="flex justify-center text-3xl text-red-600">Yanlış</div>
  //     ) : isModeEmotion === true ? (
  //       <div className=" flex flex-col items-center">
  //         <p>
  //           Ekranda her soru için bir yüz fotoğrafı göreceksiniz. Sizlerden bu
  //           fotoğraf aynı duygu olan kişiyle eşleştirmenizi istiyoruz.
  //         </p>
  //         <Button onClick={() => setIsModeEmotion(false)}>Devam</Button>
  //       </div>
  //     ) : (
  //       <div className="flex flex-col justify-center items-center ">
  //         <div>
  //           <Image
  //             src={`affective-emphaty/${current?.difficulty}/${current?.index}/${current?.imageFolder.image4}`}
  //             loader={imageLoader}
  //             alt="image3"
  //             width={200}
  //             height={200}
  //             className="mx-2 rounded-md"
  //           />
  //         </div>
  //         <div className="flex flex-row flex-wrap my-5">
  //           {current?.imageFolder &&
  //             Object.entries(current.imageFolder)
  //               .sort(() => Math.random() - 0.5)
  //               .map(([key, image], index) => {
  //                 if (key !== "image4") {
  //                   return (
  //                     <Image
  //                       key={index}
  //                       src={`affective-emphaty/${current?.difficulty}/${current?.index}/${image}`}
  //                       loader={imageLoader}
  //                       alt={`image${index + 1}`}
  //                       width={150}
  //                       height={150}
  //                       className="rounded-md mx-1"
  //                       onClick={() => handleCheck(image)}
  //                     />
  //                   );
  //                 } else {
  //                   return null;
  //                 }
  //               })}
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default Week2Game5Page;
