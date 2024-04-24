import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { useProtectedRoute } from "./useProtectedRoute";
import { updateUser } from "@/lib/api/user";
import { usePathname, useRouter } from "next/navigation";
import { weekGames } from "@/app/(dashboard)/week/layout";
import { useState } from "react";

export const useSendWeeklyData = () => {
  const { session, user } = useProtectedRoute();
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

  const { mutate } = useMutation({
    mutationFn: async (data: WeekData) => {
      if (!session.data || !user) {
        return;
      }

      setIsSending(true);

      try {
        await sendWeekData(data, session.data.user.accessToken);
      } catch (e) {
        console.error(e);
      }

      try {
        await updateUser({
          accessToken: session.data.user.accessToken,
          user: {
            ...user,
            userDetails: {
              ...user.userDetails,
              WeeklyStatus: parseInt(user.userDetails.WeeklyStatus) + 1 + "",
            },
          },
        });
      } catch (e) {
        console.error(e);
      }
    },
    onSuccess() {
      const week = Math.ceil(parseInt(user!.userDetails.WeeklyStatus) / 5);
      const gameName = weekGames[week - 1].at(
        (parseInt(user!.userDetails.WeeklyStatus) % 5) - 1
      );
      const url = `/week/${week}/${gameName?.slug}`;

      router.push(url);
      setIsSending(false);
    },
  });

  return {
    send: mutate,
    isSending
  };
};
