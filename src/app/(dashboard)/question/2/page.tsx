"use client";

import { stepTwoQuestions } from "@/assets/mockdata/survey/questions";
import { Button } from "@/components/ui/button";
import { FrownIcon, LaughIcon, MehIcon, SmileIcon } from "lucide-react";
import React from "react";
import { Progress } from "@/components/ui/progress";
import { sendQuestionData } from "@/lib/api/questions";
import { updateUser } from "@/lib/api/user";
import { useUserStore } from "@/hooks/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { subtle } from "crypto";
import { set } from "zod";
import { useRouter } from "next/navigation";
import axios from "axios";
import { m } from "framer-motion";

const das = ["Hiçbir Zaman", "Bazen ve ara sıra", "Oldukça sık", "Her zaman"];

const iri = ["1", "2", "3", "4", "5"];

const gad = [
  "Hiçbir zaman",
  "Bazı günler",
  "Günlerin yarısından fazla",
  "Hemen hemen her gün",
];

const phq = [
  "Hiçbir zaman",
  "Bazı günler",
  "Günlerin yarısından fazlasında",
  "Hemen hemen her gün",
];

const QuestionTestTwo = () => {
  const [answers, setAnswers] = React.useState<Record<string, string>>({});

  const [pages, setPages] = React.useState(1);

  const [scoreBoard, setScoreBoard] = React.useState<
    {
      type: number;
      subType: number;
      score: number;
    }[]
  >([]);

  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const session = useSession();

  const iriReverseIndex = [25, 26, 29, 34, 35, 36, 37, 40, 41];

  const handleAnswer = (
    questionId: string,
    answer: string,
    type: number,
    subType: number,
    optionIndex: number
  ) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
    if (type === 2) {
      setScoreBoard((prev) => [
        ...prev,
        {
          type,
          subType,
          score: optionIndex,
        },
      ]);
    }
    if (type === 3) {
      let score = 0;
      if (iriReverseIndex.includes(optionIndex)) {
        score = 4 - optionIndex;
      } else {
        score = optionIndex;
      }
      setScoreBoard((prev) => [
        ...prev,
        {
          type,
          subType,
          score,
        },
      ]);
    }
    if (type === 4) {
      setScoreBoard((prev) => [
        ...prev,
        {
          type,
          subType,
          score: optionIndex,
        },
      ]);
    }
    if (type === 5) {
      setScoreBoard((prev) => [
        ...prev,
        {
          type,
          subType,
          score: optionIndex,
        },
      ]);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "update"],
    mutationFn: async () => {
      if (!session.data || !user) {
        return;
      }

      for (let i = 1; i < 4; i++) {
        await sendQuestionData(
          {
            score: scoreBoard
              .filter((item) => item.subType === i && item.type === 2)
              .reduce((acc, item) => acc + item.score, 0),
            subType: i,
            type: 2,
            group: "S2",
          },
          session.data.user.accessToken
        );
      }

      for (let i = 1; i < 5; i++) {
        await sendQuestionData(
          {
            score: scoreBoard
              .filter((item) => item.subType === i && item.type === 3)
              .reduce((acc, item) => acc + item.score, 0),
            subType: i,
            type: 3,
            group: "S2",
          },
          session.data.user.accessToken
        );
      }

      await sendQuestionData(
        {
          score: scoreBoard
            .filter((item) => item.type === 4)
            .reduce((acc, item) => acc + item.score, 0),
          subType: null,
          type: 4,
          group: "S2",
        },
        session.data.user.accessToken
      );

      await sendQuestionData(
        {
          score: scoreBoard
            .filter((item) => item.type === 5)
            .reduce((acc, item) => acc + item.score, 0),
          subType: null,
          type: 5,
          group: "S2",
        },
        session.data.user.accessToken
      );

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            PerformanceTaskStep: "1",
            Status: "W1",
          },
        },
      });
    },
    onSuccess() {
      router.push("/test");
    },
  });

  return (
    <div className='flex flex-col items-center'>
      <h1 className='font-bold text-xl mb-10'>Anket</h1>
      <ul className='flex flex-col gap-14'>
        {stepTwoQuestions
          .slice((pages - 1) * 6, (pages - 1) * 6 + 6)
          .map((question, index) => (
            <li key={index} className='flex flex-col gap-4'>
              <p className='text-center text-lg font-semibold'>
                {question.question}
              </p>
              <div className='flex flex-col sm:flex-row justify-center gap-4 flex-wrap'>
                {question.type === 2 ? (
                  das.map((option, index) => (
                    <Button
                      variant={
                        answers[question.id.toString()] === option
                          ? "default"
                          : "secondary"
                      }
                      key={index}
                      onClick={() =>
                        handleAnswer(
                          question.id.toString(),
                          option,
                          question.type,
                          question.subType!,
                          index
                        )
                      }
                    >
                      <small className='text-sm'>{option}</small>
                    </Button>
                  ))
                ) : question.type === 3 ? (
                  iri.map((option, index) => (
                    <Button
                      variant={
                        answers[question.id.toString()] === option
                          ? "default"
                          : "secondary"
                      }
                      key={index}
                      onClick={() => {
                        handleAnswer(
                          question.id.toString(),
                          option,
                          question.type,
                          question.subType!,
                          index
                        );
                      }}
                    >
                      <small className='text-sm'>{option}</small>
                    </Button>
                  ))
                ) : question.type === 4 ? (
                  gad.map((option, index) => (
                    <Button
                      variant={
                        answers[question.id.toString()] === option
                          ? "default"
                          : "secondary"
                      }
                      key={index}
                      onClick={() => {
                        handleAnswer(
                          question.id.toString(),
                          option,
                          question.type,
                          question.subType!,
                          index
                        );
                      }}
                    >
                      <small className='text-sm'>{option}</small>
                    </Button>
                  ))
                ) : question.type === 5 ? (
                  phq.map((option, index) => (
                    <Button
                      variant={
                        answers[question.id.toString()] === option
                          ? "default"
                          : "secondary"
                      }
                      key={index}
                      onClick={() => {
                        handleAnswer(
                          question.id.toString(),
                          option,
                          question.type,
                          question.subType!,
                          index
                        );
                      }}
                    >
                      <small className='text-sm'>{option}</small>
                    </Button>
                  ))
                ) : (
                  <p>Unknown type</p>
                )}
              </div>
            </li>
          ))}
      </ul>
      <Progress
        className='my-5 max-w-96'
        value={(Object.keys(answers).length * 100) / stepTwoQuestions.length}
      />

      <nav role='navigation' className='grid grid-cols-3 gap-4'>
        <Button
          variant='outline'
          className='flex-1 sm:flex-none'
          disabled={pages === 1}
          onClick={() => setPages((prev) => prev - 1)}
        >
          Geri
        </Button>
        <Button
          variant='outline'
          className='flex-1 sm:flex-none'
          disabled={pages === 11}
          onClick={() => setPages((prev) => prev + 1)}
        >
          İleri
        </Button>
        <Button
          variant='default'
          onClick={() => {
            console.log(answers);
            mutate();
          }}
          disabled={Object.keys(answers).length !== stepTwoQuestions.length}
        >
          Tamamla
        </Button>
      </nav>
    </div>
  );
};

export default QuestionTestTwo;
