"use client";
import FinishScreen from "@/components/game/FinishScreen";
import React, { useState } from "react";
import WeekFourGameFourIntroductions from "./_introductions";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/button";

const WeekFourGameFourPage = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [round, setRound] = useState(0);

  return (
    <div>
      {isFinished ? (
        <div className='flex justify-center items-center'>
          <FinishScreen url='/week/4/cognitive-emphaty' />
        </div>
      ) : round === 0 ? (
        <div>
          <WeekFourGameFourIntroductions />
          <Separator className='my-5' />

          <div className='flex justify-center my-5'>
            <Button>Başla</Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default WeekFourGameFourPage;
