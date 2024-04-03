"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import WeekTwoGameTwoIntroductions from "./_introductions";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "@/lib/api/user";

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
    }),
  ),
  ...Array.from({ length: data.openMount.man.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "openMount",
      sex: "man",
      index: index + 1,
    }),
  ),
  ...Array.from({ length: data.openMount.woman.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "openMount",
      sex: "woman",
      index: index + 1,
    }),
  ),
  ...Array.from({ length: data.openMount.woman.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "openMount",
      sex: "woman",
      index: index + 1,
    }),
  ),
  ...Array.from({ length: data.closeMount.man.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "closeMount",
      sex: "man",
      index: index + 1,
    }),
  ),
  ...Array.from({ length: data.closeMount.man.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "closeMount",
      sex: "man",
      index: index + 1,
    }),
  ),
  ...Array.from({ length: data.closeMount.woman.positive }).map(
    (_, index): DataType => ({
      mod: "positive",
      mount: "closeMount",
      sex: "woman",
      index: index + 1,
    }),
  ),
  ...Array.from({ length: data.closeMount.woman.negative }).map(
    (_, index): DataType => ({
      mod: "negative",
      mount: "closeMount",
      sex: "woman",
      index: index + 1,
    }),
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

  const session = useSession();
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 7,
    group: "W1",
  });

  const [timer, setTimer] = useState<number>(0);
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
            item.sex === random.sex,
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
    if (isFinished) {
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
      round === 1 ? 0 : 0,
    );

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  useEffect(() => {
    if (!isFinished) {
      return;
    }
    mutate(stats);
    clearInterval(timeout!);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleNext = () => {
    if (round >= TOTAL_ROUNDS) {
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      return;
    } else {
      setRound((round) => round + 1);
      if (!timeout) {
        setMyTimeout(
          setInterval(() => {
            setTimer((prev) => prev + 10);
          }, 10),
        );
      }
    }
  };

  const handleAnswer = (answer: DataType) => {
    if (isFinished || !current || answers.length === 0) {
      return;
    }

    if (rule === "mod" && answer.mod === current.mod) {
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setIsCorrect(true);
    } else if (rule === "mount" && answer.mount === current.mount) {
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
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
        <div className="flex items-center justify-center text-green-500 font-semibold text-4xl">
          Doğru
        </div>
      ) : isCorrect === false ? (
        <div className="flex items-center justify-center text-red-500 font-semibold text-4xl">
          Yanlış
        </div>
      ) : null}
    </div>
  );
};

export default WeekTwoGameTwoPage;
