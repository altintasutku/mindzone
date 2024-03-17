import axios from "axios";
import { access } from "fs";

export const sendWeekGameData = async ({
  stats,
  accessToken,
  stepInfo,
}: {
  stats: {
    totalWrongs: number;
    reactionTime: number;
    totalAccuracy: number;
  };
  accessToken: string;
  stepInfo: { step: number; group: string };
}) => {
  const { status } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/week-games`,
    {
      totalErrorCount: stats.totalWrongs,
      totalAccuracy: stats.totalAccuracy,
      reactionTime: stats.reactionTime / 1000,
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
