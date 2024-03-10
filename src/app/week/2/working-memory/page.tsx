"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect } from "react";
import { set } from "zod";
import IntroductionCF from "./_introductions";

const emotionNamelist = ["AFS", "ANS", "DIS", "HAS", "SAS", "SUS", "NES"];
const genderFolderName = ["Erkek", "Kadın"];
const sexs = ["AM", "AF"];
const personCountPerSex = 15;
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

  useEffect(() => {
    if (isFinished || round === 0) {
      return;
    }
    setPersons([]);
    setAnswer([]);
    setSelectedPersons([]);
    setRotateStates([]);
    setIsCorrect(null);

    for (let i = 0; i < 2; i++) {
      selectPerson();
    }
    setTimeout(() => {
      setRotateStates(new Array(4).fill(true));
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (isFinished || round === 0) {
      return;
    }

    if (persons.length === 4) {
      return;
    }

    selectAnswer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persons]);

  useEffect(() => {
    if (selectedPersons.length === 2) {
      if (
        selectedPersons[0].index === selectedPersons[1].index &&
        selectedPersons[0].genderFolder === selectedPersons[1].genderFolder
      ) {
        setTimeout(() => {
          setIsCorrect(true);
          setTimeout(() => {
            handleNext();
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsCorrect(false);
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
      setIsFinished(true);
      return;
    }
    setRound((prev) => prev + 1);
  };

  const selectPerson = () => {
    let isUnique = false;

    let newElement: CurrentPersonType;

    while (!isUnique) {
      const genderFolder = genderFolderName[Math.floor(Math.random() * 2)];
      const sex = genderFolder === "Erkek" ? sexs[0] : sexs[1];
      const index = Math.floor(Math.random() * personCountPerSex) + 1;
      const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

      newElement = {
        emotionName,
        genderFolder,
        index,
        sex,
      };

      isUnique = !persons.some(
        (item) =>
          item.index === index &&
          item.emotionName === emotionName &&
          item.sex === sex &&
          item.genderFolder === genderFolder
      );

      setPersons((prev) => [...prev, newElement]);
    }
  };

  const selectAnswer = () => {
    const genderFolder = genderFolderName[Math.floor(Math.random() * 2)];
    const sex = genderFolder === "Erkek" ? sexs[0] : sexs[1];
    const index = Math.floor(Math.random() * personCountPerSex) + 1;
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

    const newElement = {
      emotionName,
      genderFolder,
      index,
      sex,
    };

    if (persons.some((item) => item.index === index && item === newElement)) {
      selectAnswer();
    } else {
      setAnswer([newElement]);
    }

    selectSecondAnswer(newElement);
  };

  const selectSecondAnswer = (lastElement: CurrentPersonType) => {
    const emotionName = emotionNamelist[Math.floor(Math.random() * 7)];

    const newElement = {
      emotionName,
      genderFolder: lastElement.genderFolder,
      index: lastElement.index,
      sex: lastElement.sex,
    };

    if (lastElement.emotionName === emotionName) {
      selectSecondAnswer(lastElement);
      return;
    } else {
      setAnswer((prev) => [...prev, newElement]);
      setPersons((prev) => [...prev, lastElement, newElement]);
      setPersons((prev) => prev.sort(() => Math.random() - 0.5));
    }
  };

  const handleImageClick = (index: number) => {
    setRotateStates((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    //check is same or not
  };

  const handleSelectPerson = (person: CurrentPersonType) => {
    setSelectedPersons((prev) => {
      if (prev.length === 2) {
        return [person];
      }
      return [...prev, person];
    });
  };

  return (
    <div>
      {round === 0 ? (
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
                  handleSelectPerson(person);
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
