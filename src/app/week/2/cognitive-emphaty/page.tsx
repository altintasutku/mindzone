"use client";
import { weekTwoGame4Data } from "@/assets/mockdata/week2game4data";
import React, { useEffect } from "react";
import IntroductionCF from "../working-memory/_introductions";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";
import { set } from "zod";
import FinishScreen from "@/components/game/FinishScreen";

const WeekTwoGameFourPage = () => {
  const [round, setRound] = React.useState(0);
  const [isFinished, setIsFinished] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  useEffect(() => {
    if (!isFinished) {
      setIsCorrect(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  const handleNext = () => {
    if (round < weekTwoGame4Data.length - 1) {
      setRound(round + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleCheck = (option: string) => {
    if (
      weekTwoGame4Data[round - 1].correctAnswer.charAt(0) === option.charAt(0)
    ) {
      setIsCorrect(true);
      setTimeout(() => {
        handleNext();
      }, 1000);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div>
      {isFinished ? (
        <FinishScreen url='/week/2/cognitive-emphaty/1' />
      ) : round === 0 ? (
        <div>
          <IntroductionCF />

          <div className='flex justify-center items-center mt-5'>
            <Button onClick={handleNext}>Devam</Button>
          </div>
        </div>
      ) : isCorrect === true ? (
        <div className='flex justify-center items-center text-3xl text-green-600'>
          Tebrikler Doğru Cevap
        </div>
      ) : isCorrect === false ? (
        <div className='flex flex-col h-48 justify-center items-center'>
          <p className='text-lg'>{weekTwoGame4Data[round - 1].ifWrong}</p>
          <Button
            className='my-5 bg-red-400 hover:bg-red-950'
            onClick={handleNext}
          >
            Devam
          </Button>
        </div>
      ) : (
        <div>
          <div>
            <p className='mx-10 font-bold'>
              {weekTwoGame4Data[round - 1].question}
            </p>
            <div className=' flex flex-row my-10 justify-center'>
              {weekTwoGame4Data[round - 1].options.map((option, index) => (
                <div className='xlg:mx-10 lg:mx-4' key={index}>
                  <Button
                    onClick={() => {
                      handleCheck(option);
                    }}
                    variant={"ghost"}
                  >
                    {option}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeekTwoGameFourPage;
