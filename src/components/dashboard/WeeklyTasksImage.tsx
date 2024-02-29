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
      className="border border-slate-200 aspect-square object-cover rounded-md w-full md:w-60"
      alt="weekPreview"
      width={300}
      height={300}
    />
  );
};

export default WeeklyTasksImage;
