import axios from "axios";
import { userValidator, ZodUser } from "../validators/user";

export const updateUser = async ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: ZodUser;
}) => {
  return (
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user.id}`,
      {
        ...user,
        password: "",
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
    )
  ).data;
};

export const getUser = async ({
  accessToken,
  userId,
}: {
  accessToken: string;
  userId: number;
}) => {
  const { data, status } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
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

  if (status !== 200) {
    throw new Error("User not found");
  }

  const {success} = userValidator.safeParse(data);

  if (!success) {
    throw new Error("User not found");
  }

  return userValidator.parse(data);
};
