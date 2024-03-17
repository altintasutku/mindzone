import axios from "axios";

export type WeekData = {
  totalErrorCount: number;
  totalAccuracy: number;
  reactionTime: number;
  step: number;
  group: string;
};

export const sendWeekData = async (
  weekData: WeekData,
  accessToken: string,
) => {
  const { status } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/weekly-tasks`,
    { ...weekData },
    {
      headers: {
        Token: accessToken,
      },
    }
  );

  if (status !== 200) {
    throw new Error("Failed to send week data");
  }

  return status;
};
