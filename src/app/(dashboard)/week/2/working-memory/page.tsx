"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { set } from "zod";
import IntroductionCF from "./_introductions";
import { selectImagesFunction } from "@/assets/mockdata/weekGames/week2WorkingMemory";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/user";
import { clear } from "console";
import FinishScreen from "@/components/game/FinishScreen";

const MAXROUND = 52;

type CurrentPersonType = {
  emotionName: string;
  genderFolder: string;
  sex: string;
  index: number;
};

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/affective_emphaty/${src}.JPG`;
};

const WorkingMemory = () => {
  const [round, setRound] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [persons, setPersons] = React.useState<CurrentPersonType[]>([]);
  const [answer, setAnswer] = React.useState<CurrentPersonType[]>([]);
  const [rotateStates, setRotateStates] = React.useState<boolean[]>([]);
  const [selectedPersons, setSelectedPersons] = React.useState<
    CurrentPersonType[]
  >([]);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);
  const [isRotated, setIsRotated] = useState(false);

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 1,
    group: "W2",
  });

  const [timer, setTimer] = useState<number>(0);
  const [timeout, setMyTimeout] = useState<NodeJS.Timeout | null>(null);
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
    if (!isFinished) {
      return;
    }

    mutate(stats);

    clearInterval(timeout!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  useEffect(() => {
    if (isFinished || round === 0) {
      return;
    }
    setPersons([]);
    setAnswer([]);
    setSelectedPersons([]);
    setRotateStates([]);
    setIsCorrect(null);
    setIsRotated(false);

    selectPersons();

    setTimeout(() => {
      setRotateStates(new Array(4).fill(true));
      setIsRotated(true);
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const selectPersons = () => {
    let { persons, answer } = selectImagesFunction();
    setPersons(persons);
    setAnswer(answer);
    shuffleArray(persons);
  };

  useEffect(() => {
    if (selectedPersons.length === 2) {
      if (
        selectedPersons[0].index === selectedPersons[1].index &&
        selectedPersons[0].genderFolder === selectedPersons[1].genderFolder
      ) {
        setTimeout(() => {
          setIsCorrect(true);
          setStats((prev) => ({
            ...prev,
            totalAccuracy: prev.totalAccuracy + 1,
          }));
          setTimeout(() => {
            handleNext();
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsCorrect(false);
          setStats((prev) => ({
            ...prev,
            totalErrorCount: prev.totalErrorCount + 1,
          }));
          setTimeout(() => {
            handleNext();
          }, 1000);
        }, 1000);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPersons]);

  const handleNext = () => {
    if (round === MAXROUND) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    }
    setRound((prev) => prev + 1);
    if (!timeout) {
      setMyTimeout(
        setInterval(() => {
          setTimer((prev) => prev + 10);
        }, 10)
      );
    }
  };

  const handleImageClick = (index: number) => {
    if (rotateStates[index] === true) {
      setRotateStates((prev) => {
        const newState = [...prev];
        newState[index] = !newState[index];
        return newState;
      });
    } else {
      return;
    }

    //check is same or not
  };

  const handleSelectPerson = (person: CurrentPersonType, index: number) => {
    if (isRotated) {
      setSelectedPersons((prev) => {
        if (prev.length === 2) {
          return [person];
        }
        return [...prev, person];
      });
    } else {
      return;
    }
  };

  return (
    <div>
      {isFinished ? (
        <div className='flex justify-center items-center'>
          <FinishScreen url='/week/2/cognitive-flexibility' />
        </div>
      ) : round === 0 ? (
        <div>
          <IntroductionCF />

          <div className='flex justify-center items-center mt-5'>
            <Button onClick={handleNext}>Devam</Button>
          </div>
        </div>
      ) : isCorrect === true ? (
        <div className=' flex justify-center items-center'>
          <p className=' text-green-600 text-3xl'>Doğru</p>
        </div>
      ) : isCorrect === false ? (
        <div className=' flex justify-center items-center'>
          <p className=' text-red-600 text-3xl'>Yanlış</p>
        </div>
      ) : (
        <div className='flex gap-4 justify-center'>
          {persons.map((person, index) => (
            <div key={index} className=' bg-slate-700 rounded-md'>
              <Image
                className={cn("rounded-md duration-500 ease-in-out", {
                  " rotate-y-180 opacity-0": rotateStates[index],
                })}
                loader={imageLoader}
                src={personToPath(person)}
                alt={`person-${person.index}`}
                height={150}
                width={150}
                onClick={() => {
                  handleImageClick(index);
                  handleSelectPerson(person, index);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const personToPath = (person: CurrentPersonType) => {
  return `${person.genderFolder}/${person.sex}${
    person.index < 10 ? `0${person.index}` : person.index
  }/${person.sex}${person.index < 10 ? `0${person.index}` : person.index}${
    person.emotionName
  }`;
};

export default WorkingMemory;
