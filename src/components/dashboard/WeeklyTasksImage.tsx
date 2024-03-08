"use client";

import Image from "next/image";
import React from "react";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/weekGames/${src}.png`;
};

const WeeklyTasksImage = () => {
  return (
    <Image
      loader={imageLoader}
      src={`example-week-preview`}
      className="border border-slate-200 aspect-square object-cover rounded-md w-11/12 shadow-md"
      alt="weekPreview"
      width={250}
      height={250}
    />
  );
};

export default WeeklyTasksImage;
