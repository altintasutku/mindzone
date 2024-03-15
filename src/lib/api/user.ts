import axios from "axios";
import { userDetailsValidator, userValidator } from "../validators/user";
import { z } from "zod";

export const updateUser = async ({
  accessToken,
  user,
}: {
  accessToken: string;
  user: z.infer<typeof userValidator>;
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
      },
    }
  );

  if (status !== 200) {
    throw new Error("User not found");
  }

  const user = userValidator.parse(data);

  return user;
};
