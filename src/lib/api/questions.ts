import axios from "axios";

export async function sendQuestionData(
  data: {
    score: number;
    subType: number | null;
    type: number;
    group: string;
  },
  accessToken: string
) {
  const { status } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/surveys`,
    data,
    {
      headers: {
        Token: accessToken,
      },
    }
  );

  if (status !== 200) throw new Error("Error while sending data");
}
