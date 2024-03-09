"use client";

import Image from "next/image";
import React from "react";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/previews/${src}.png`;
};

const WeeklyTasksImage = ({
  week,
  weekNumber,
}: {
  week: WeekProgress;
  weekNumber: number;
}) => {
  return (
    <Image
      loader={imageLoader}
      src={
        week.progress < 20
          ? "example-week-preview"
          : `week${weekNumber}_game${week.progress / 20}`
      }
      className="border border-slate-200 aspect-square object-cover rounded-md w-11/12 shadow-md"
      alt="weekPreview"
      width={250}
      height={250}
    />
  );
};

export default WeeklyTasksImage;
