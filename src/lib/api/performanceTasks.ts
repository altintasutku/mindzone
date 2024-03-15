import axios from "axios";

export const sendPerformanceTaskData = async ({
  stats,
  accessToken,
  stepInfo,
}: {
  stats: {
    totalWrongs: number;
    resistanceWrongs: number;
    reactionTime: number;
    totalAccuracy: number;
  };
  accessToken: string;
  stepInfo: { step: number; group: number };
}) => {
  const { status } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/performance-tasks`,
    {
      totalErrorCount: stats.totalWrongs, // total wrongs
      totalAccuracy: stats.totalAccuracy, // total corrects
      reactionTime: stats.reactionTime / 1000, // milisecond to second
      ...stepInfo,
    },
    {
      headers: {
        Token: accessToken,
      },
    }
  );

  if (status !== 200) throw new Error("Error while sending data");
};
