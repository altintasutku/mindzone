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
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
        "Access-Control-Allow-Headers":
          "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      },
    }
  );

  if (status !== 200) throw new Error("Error while sending data");
}
