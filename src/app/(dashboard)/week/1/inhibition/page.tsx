"use client";

import FinishScreen from "@/components/game/FinishScreen";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { CheckIcon, XCircleIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import IntroductionInh from "./_introductions";
import { Progress } from "@/components/ui/progress";
import { WeekData, sendWeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/hooks/useUserStore";
import { updateUser } from "@/lib/api/user";

type Color = {
  name: string;
  textColor: string;
};

const colors: Color[] = [
  { name: "Kırmızı", textColor: "text-red-400" },
  { name: "Mavi", textColor: "text-blue-400" },
  { name: "Yeşil", textColor: "text-green-400" },
  { name: "Sarı", textColor: "text-yellow-400" },
  { name: "Mor", textColor: "text-purple-400" },
  { name: "Turuncu", textColor: "text-orange-400" },
  { name: "Pembe", textColor: "text-pink-400" },
];

enum CorrectState {
  Correct = "Correct",
  Incorrect = "Incorrect",
  None = "None",
}

const CORRECT_DURATION = 1000;

const TOTAL_ROUNDS = 2;

const InhibitionPage = () => {
  const [round, setRound] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const session = useSession();
  const user = useUserStore((state) => state.user);

  const [currentColor, setCurrentColor] = useState<Color | null>(null);

  const [correctState, setCorrectState] = useState<CorrectState>(
    CorrectState.None
  );

  const [answers, setAnswers] = useState<Color[]>([]);

  const [timer, setTimer] = useState<number>(0);
  let timeout: NodeJS.Timeout;

  const [stats, setStats] = useState<WeekData>({
    totalErrorCount: 0,
    totalAccuracy: 0,
    reactionTime: 0,
    step: 3,
    group: "W1",
  });

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
    },
  });

  useEffect(() => {
    if (!isFinished) return;

    mutate(stats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinished]);

  const handleNext = () => {
    if (round >= TOTAL_ROUNDS) {
      clearInterval(timeout);
      setStats((prev) => ({
        ...prev,
        reactionTime: timer,
      }));
      setIsFinished(true);
      setCurrentColor(null);
      return;
    }

    setRound((prev) => prev + 1);

    const generatedColor = colors[Math.floor(Math.random() * colors.length)];
    let generatedColorSecond =
      colors[Math.floor(Math.random() * colors.length)];

    while (generatedColor.textColor === generatedColorSecond.textColor) {
      generatedColorSecond = colors[Math.floor(Math.random() * colors.length)];
    }

    setCurrentColor({
      name: generatedColor.name,
      textColor: generatedColorSecond.textColor,
    });

    const answerArr = [generatedColor, generatedColorSecond];

    let generatedColorThird = colors[Math.floor(Math.random() * colors.length)];

    while (
      generatedColorThird.textColor === generatedColor.textColor ||
      generatedColorThird.textColor === generatedColorSecond.textColor
    ) {
      generatedColorThird = colors[Math.floor(Math.random() * colors.length)];
    }

    let generatedColorFourth =
      colors[Math.floor(Math.random() * colors.length)];

    while (
      generatedColorFourth.textColor === generatedColor.textColor ||
      generatedColorFourth.textColor === generatedColorSecond.textColor ||
      generatedColorFourth.textColor === generatedColorThird.textColor
    ) {
      generatedColorFourth = colors[Math.floor(Math.random() * colors.length)];
    }

    answerArr.push(generatedColorThird, generatedColorFourth);

    // Shuffle answers
    for (let i = answerArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answerArr[i], answerArr[j]] = [answerArr[j], answerArr[i]];
    }

    setAnswers(answerArr);

    if (!timeout) {
      timeout = setInterval(() => {
        setTimer((prev) => prev + 10);
      }, 10);
    }
  };

  const handleAnswer = (color: string) => {
    if (!currentColor) {
      return;
    }

    if (currentColor.textColor === color) {
      // Correct answer
      setStats((prev) => ({
        ...prev,
        totalAccuracy: prev.totalAccuracy + 1,
      }));
      setCorrectState(CorrectState.Correct);
    } else {
      // Incorrect answer
      setStats((prev) => ({
        ...prev,
        totalErrorCount: prev.totalErrorCount + 1,
      }));
      setCorrectState(CorrectState.Incorrect);
    }

    setTimeout(() => {
      setCorrectState(CorrectState.None);
      handleNext();
    }, CORRECT_DURATION);
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen url="/week/1/director-task" />
      ) : round === 0 ? (
        <div className="flex flex-col">
          <IntroductionInh />
          <Separator className="my-5" />

          <div className="flex justify-center my-5">
            <Button onClick={handleNext}>Başla</Button>
          </div>
        </div>
      ) : currentColor ? (
        <div className="flex flex-col items-center pt-16">
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
            {answers.map((answer, index) => (
              <Button
                key={index}
                className="shadow"
                variant={"secondary"}
                onClick={() => handleAnswer(answer.textColor)}
              >
                {answer.name}
              </Button>
            ))}
          </div>

          <Progress value={(100 * round) / TOTAL_ROUNDS} className="mt-20" />
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
