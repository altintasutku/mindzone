"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import WeekTwoGameTwoIntroductions from "./_introductions";
import Image from "next/image";

const data = {
  openMount: {
    man: {
      positive: 16,
      negative: 31,
    },
    woman: {
      positive: 16,
      negative: 32,
    },
  },
  closeMount: {
    man: {
      positive: 16,
      negative: 31,
    },
    woman: {
      positive: 16,
      negative: 32,
    },
  },
};

type DataType = {
  mod: "positive" | "negative";
  mount: "openMount" | "closeMount";
  sex: "man" | "woman";
  index: number;
};

const allData: DataType[] = [
  ...Array.from({ length: data.openMount.man.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "openMount",
      sex: "man",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.openMount.man.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "openMount",
      sex: "man",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.openMount.woman.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "openMount",
      sex: "woman",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.openMount.woman.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "openMount",
      sex: "woman",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.closeMount.man.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "closeMount",
      sex: "man",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.closeMount.man.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "closeMount",
      sex: "man",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.closeMount.woman.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "closeMount",
      sex: "woman",
      index: index + 1,
    })
  ),
  ...Array.from({ length: data.closeMount.woman.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "closeMount",
      sex: "woman",
      index: index + 1,
    })
  ),
].sort(() => Math.random() - 0.5);

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_two/cognitive-flexibility/${src}.jpg`;
};

const DURATION = 800;
const TOTAL_ROUNDS = 200;

const WeekTwoGameTwoPage = () => {
  const [round, setRound] = useState(0);

  const [current, setCurrent] = useState<DataType>();
  const [answers, setAnswers] = useState<DataType[]>([]);

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const [rule, setRule] = useState<"mod" | "mount">("mod");

  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!current || round === 0) return;

    const arr: DataType[] = [];

    while (arr.length < 3) {
      const random = allData[Math.floor(Math.random() * allData.length)];

      if (
        (random.mod === current.mod &&
          random.mount === current.mount &&
          random) ||
        (rule === "mod" && random.mod === current.mod) ||
        (rule === "mount" && random.mount === current.mount) ||
        arr.some(
          (item) =>
            item.index === random.index &&
            item.mount === random.mount &&
            item.mod === random.mod &&
            item.sex === random.sex
        )
      ) {
        continue;
      } else {
        arr.push(random);
      }
    }

    while (arr.length < 4) {
      const random = allData[Math.floor(Math.random() * allData.length)];

      if (
        (random.mod === current.mod && random.mount === current.mount) ||
        (rule === "mod" && random.mod !== current.mod) ||
        (rule === "mount" && random.mount !== current.mount)
      ) {
        continue;
      }

      arr.push(random);
    }

    arr.sort(() => Math.random() - 0.5);

    setAnswers(arr);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  useEffect(() => {
    if (round >= TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }
    if (round === 0) {
      return;
    }

    setRule((round / 10) % 2 <= 1 ? "mod" : "mount");

    const timeout = setTimeout(
      () => {
        setCurrent(allData[round - 1]);
      },
      round === 1 ? 0 : 0
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const handleNext = () => {
    if (isFinished) {
      return;
    }

    setRound((round) => round + 1);
  };

  const handleAnswer = (answer: DataType) => {
    if (isFinished || !current || answers.length === 0) {
      return;
    }

    if (rule === "mod" && answer.mod === current.mod) {
      setIsCorrect(true);
    } else if (rule === "mount" && answer.mount === current.mount) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }

    setTimeout(() => {
      handleNext();
      setIsCorrect(null);
    }, DURATION);
  };

  return (
    <div>
      {/* TODO: FINISH SCREEN */}
      {round === 0 ? (
        <div className="flex flex-col items-center gap-5">
          <WeekTwoGameTwoIntroductions />
          <Separator />
          <Button onClick={handleNext}>Start</Button>
        </div>
      ) : isCorrect === null && current ? (
        <div className="flex flex-col items-center gap-8">
          <div>
            <Image
              loader={imageLoader}
              src={`${current.mount}/${current.sex}/${current.mod}/${current.index}`}
              alt="currentQuestion"
              width={170}
              height={170}
              className="border border-slate-200 rounded-md"
            />
          </div>
          <Separator />
          <div className="flex gap-4 flex-wrap justify-center">
            {answers.map((answer, index) => (
              <Image
                key={index}
                loader={imageLoader}
                src={`${answer.mount}/${answer.sex}/${answer.mod}/${answer.index}`}
                alt="answerImg"
                width={170}
                height={170}
                className="border border-slate-200 rounded-md cursor-pointer"
                onClick={() => handleAnswer(answer)}
              />
            ))}
          </div>
        </div>
      ) : isCorrect === true ? (
        <div className="flex items-center justify-center text-green-500 font-semibold text-4xl">Doğru</div>
      ) : isCorrect === false ? (
        <div className="flex items-center justify-center text-red-500 font-semibold text-4xl">Yanlış</div>
      ) : null}
    </div>
  );
};

export default WeekTwoGameTwoPage;
