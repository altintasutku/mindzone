"use client";

import {
  stepOneAnswersAscending,
  stepOneQuestions,
} from "@/assets/mockdata/survey/questions";
import { Button } from "@/components/ui/button";
import {
  FrownIcon,
  LaughIcon,
  Loader2Icon,
  MehIcon,
  SmileIcon,
} from "lucide-react";
import React, { useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/hooks/useUserStore";

const options = [
  "Kesinlikle Katılıyorum",
  "Sıklıkla Katılıyorum",
  "Bazen Katılıyorum",
  "Kesinlikle Katılmıyorum",
];

const QuestionTestOne = () => {
  const session = useSession();
  const user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const router = useRouter();

  if (!session) {
    router.push("/login");
  }

  const [answers, setAnswers] = React.useState<Record<string, number>>({});
  const [scoreBoard, setScoreBoard] = React.useState<Record<string, number>>(
    {}
  );
  const [totalScore, setTotalScore] = React.useState(0);

  // Calculate total score
  useEffect(() => {
    const total = Object.values(scoreBoard).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalScore(total);
  }, [scoreBoard]);

  const handleAnswer = (questionId: string, scoreIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: scoreIndex }));

    // If the question is in the ascending list, add the score as is, else subtract it from 4
    if (stepOneAnswersAscending.includes(parseInt(questionId))) {
      setScoreBoard((prev) => ({ ...prev, [questionId]: scoreIndex + 1 }));
    } else {
      setScoreBoard((prev) => ({ ...prev, [questionId]: 4 - scoreIndex }));
    }
  };

  const [pages, setPages] = React.useState(1);

  const { mutate, isPending } = useMutation({
    mutationKey: ["user", "update"],
    mutationFn: async () => {
      if (!session.data || !user) {
        return;
      }

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            Status: user.userDetails.Status === "S1" ? "PT1" : "PT2",
          },
        },
      });
    },
    onSuccess() {
      router.push("/test");
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-bold text-xl mb-10">Anket</h1>
      <ul className="flex flex-col gap-14">
        {stepOneQuestions
          .slice((pages - 1) * 5, (pages - 1) * 5 + 5)
          .map((question, index) => (
            <li key={index} className="flex flex-col gap-4">
              <p className="text-center text-lg font-semibold">
                {question.title}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 flex-wrap">
                {options.map((option, index) => (
                  <Button
                    variant={
                      answers[question.id.toString()] === index
                        ? "default"
                        : "secondary"
                    }
                    key={index}
                    onClick={() => handleAnswer(question.id.toString(), index)}
                  >
                    {index === 0 ? (
                      <LaughIcon size={18} className="mr-2" />
                    ) : index === 1 ? (
                      <SmileIcon size={18} className="mr-2" />
                    ) : index === 2 ? (
                      <MehIcon size={18} className="mr-2" />
                    ) : (
                      <FrownIcon size={18} className="mr-2" />
                    )}
                    <small className="text-sm">{option}</small>
                  </Button>
                ))}
              </div>
            </li>
          ))}
      </ul>

      <Progress
        className="my-5 max-w-96"
        value={(Object.keys(answers).length * 100) / stepOneQuestions.length}
      />

      <nav role="navigation" className="grid grid-cols-3 gap-4">
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={pages === 1}
          onClick={() => setPages((prev) => prev - 1)}
        >
          Geri
        </Button>
        <Button
          variant="outline"
          className="flex-1 sm:flex-none"
          disabled={pages === 10}
          onClick={() => setPages((prev) => prev + 1)}
        >
          İleri
        </Button>
        <Button
          variant="default"
          onClick={() => {
            mutate();
          }}
          // disabled={
          //   Object.keys(answers).length !== stepOneQuestions.length || isPending
          // }
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : "Tamamla"}
        </Button>
      </nav>
    </div>
  );
};

export default QuestionTestOne;
