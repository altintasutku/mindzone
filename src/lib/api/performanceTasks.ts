import axios from "axios";

export type PerformanceData = {
  totalWrongs: number;
  resistanceWrongs: number;
  reactionTime: number;
  totalAccuracy: number;
  missing: number;
  accuracyReactionTime: number;
  errorReactionTime: number;
};

export const InitPerformanceData: PerformanceData = {
  totalWrongs: 0,
  resistanceWrongs: 0,
  reactionTime: 0,
  totalAccuracy: 0,
  accuracyReactionTime: 0,
  errorReactionTime: 0,
  missing: 0,
};

export const sendPerformanceTaskData = async ({
  stats,
  accessToken,
  stepInfo,
}: {
  stats: PerformanceData;
  accessToken: string;
  stepInfo: { step: number; group: string };
}) => {
  const { status } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/performance-tasks`,
    {
      totalErrorCount: stats.totalWrongs,
      totalAccuracy: stats.totalAccuracy,
      reactionTime: stats.reactionTime / 1000, // milisecond to second
      step: stepInfo.step,
      group: stepInfo.group,
      accuracyReactionTime: stats.accuracyReactionTime / 1000,
      errorReactionTime: stats.errorReactionTime / 1000,
      missingReactionTime: stats.missing,
    },
    {
      headers: {
        Token: accessToken,
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    }
  );

  if (status !== 200) throw new Error("Error while sending data");
};
