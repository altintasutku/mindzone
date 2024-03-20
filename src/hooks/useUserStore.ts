import { getUser } from "@/lib/api/user";
import { userValidator } from "@/lib/validators/user";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { create } from "zustand";

interface UserState {
  user: z.infer<typeof userValidator> | null;
  setUser: (user: z.infer<typeof userValidator>) => void;
  updateUser: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: z.infer<typeof userValidator>;
  }) => Promise<void>;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => {
    set(() => ({
      user,
    }));
  },
  updateUser: async ({ accessToken, user }) => {
    const { status } = await axios.put(
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
    );

    if (status !== 200) {
      throw new Error("Error updating user");
    }

    const data = await getUser({
      accessToken,
      userId: user.id,
    });

    const userSchema = userValidator.parse(data);

    set(() => ({ user: userSchema }));
  },
}));
