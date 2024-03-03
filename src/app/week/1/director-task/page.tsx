"use client"

import React, { useState } from 'react'
import DirectorTaskIntroductions from './_introductions'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'
import FinishScreen from '@/components/game/FinishScreen'

const boxImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
}

const directorImageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/week_one/director_task/${src}.png`;
}

type Level = {
  directorSays: string;
  gameMap: GameNode[][];
  answer: [number, number];
}

type GameNode = {
  value: string;
  isShowing: boolean;
}

const gameMap: GameNode[][] = [
  [
    { value: "A", isShowing: false },
    { value: "", isShowing: false },
    { value: "", isShowing: false },
    { value: "", isShowing: false },
  ],
  [
    { value: "E", isShowing: true },
    { value: "F", isShowing: false },
    { value: "", isShowing: true },
    { value: "H", isShowing: true },
  ],
  [
    { value: "", isShowing: true },
    { value: "", isShowing: true },
    { value: "", isShowing: false },
    { value: "L", isShowing: true },
  ],
  [
    { value: "", isShowing: false },
    { value: "A", isShowing: true },
    { value: "", isShowing: false },
    { value: "P", isShowing: true },
  ],
]

const levels: Level[] = [
  {
    directorSays: "A'yı seç",
    gameMap,
    answer: [3, 1]
  }
]

const TOTAL_ROUNDS = 1;

const WeekOneDirectorTaskPage = () => {

  const [round, setRound] = useState(0);

  const [level, setLevel] = useState(0);

  const [isFinished, setIsFinished] = useState(false);

  const handleNextRound = () => {
    if (round === TOTAL_ROUNDS) {
      setIsFinished(true);
      return;
    }

    setRound(prev => prev + 1);
  }

  const handleCellClick = (row: number, col: number) => {
    if (col === levels[level].answer[0] && row === levels[level].answer[1]) {
      console.log("Doğru");
    } else {
      console.log("Yanlış");
    }
    handleNextRound();
  }

  return (
    <div className='flex flex-col items-center gap-7'>
      {isFinished ? <FinishScreen url='/week/1/affective-empathy' />
        : round === 0 ?
          <>
            <DirectorTaskIntroductions />

            <Separator />

            <Button onClick={handleNextRound}>Başla</Button>
          </>
          : levels.map((level, i) => (
            <div key={i + "i"} className='space-y-10 my-10'>
              <div className='flex gap-5 items-start'>
                <div className='flex flex-col items-center my-20'>
                  {level.gameMap.map((row, j) => (
                    <div key={j + "j"} className='flex'>
                      {row.map((gameNode, k) => (
                        <div
                          key={k + "k"}
                          className={cn('flex flex-col items-center justify-center relative group cursor-pointer', {
                            "z-30": j === 0,
                            "z-20": j === 1,
                            "z-10": j === 2,
                            "z-0": j === 3,
                          })}
                          onClick={() => handleCellClick(k, j)}
                        >
                          <Image
                            loader={boxImageLoader}
                            src={!gameNode.isShowing ? "full-box" : "empty-box"}
                            alt="boxImage"
                            className='-m-[4px] sm:-m-[8px]'
                            height={100} width={100} />
                          <span className={cn('absolute text-ls text-black group-hover:font-semibold', {
                            "text-white": !gameNode.isShowing,
                          })}>{gameNode.value}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div className='flex flex-col items-center gap-4'>
                  <h1 className='font-bold text-xl border border-slate-100 rounded-lg px-4 py-2'>{level.directorSays}</h1>
                  <Image
                    loader={directorImageLoader}
                    src="director"
                    alt="directorImage"
                    height={40} width={40} />
                </div>
              </div>
              <Progress value={round * 100 / TOTAL_ROUNDS} />
            </div>
          ))}
    </div>
  )
}

export default WeekOneDirectorTaskPage
