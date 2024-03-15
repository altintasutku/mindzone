import { getUser } from "@/lib/api/user";
import { userValidator } from "@/lib/validators/user";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { create } from "zustand";

interface UserState {
  user: z.infer<typeof userValidator>;
  setUser: (user: z.infer<typeof userValidator>) => void;
  updateUser: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: z.infer<typeof userValidator>;
  }) => Promise<void>;
}

export const initialUserState: z.infer<typeof userValidator> = {
  id: 0,
  code: "",
  name: "",
  surname: "",
  username: "",
  email: "",
  isActive: false,
  isLocked: false,
  userDetails: {
    Age: "",
    ChronicIllness: "",
    ContactType: "",
    Education: "",
    Gender: "",
    PerformanceTaskStep: "",
    Phone: "",
    PhysicalCondition: "",
    PsychologicalHistory: "",
    Status: "",
    UserType: "",
    WeeklyStatus: "",
  },
};

export const useUserStore = create<UserState>()((set) => ({
  user: initialUserState,
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
        },
      }
    );

    if (status !== 200) {
      throw new Error("Error updating user");
    }

    const data = await getUser({
      accessToken,
      userId: user.id,
    })

    const userSchema = userValidator.parse(data);

    set(() => ({ user: userSchema }));
  },
}));
