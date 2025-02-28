import { sendWeekData, WeekData } from "@/lib/api/week";
import { useMutation } from "@tanstack/react-query";
import { useProtectedRoute } from "./useProtectedRoute";
import { updateUser } from "@/lib/api/user";
import { useState } from "react";
import {
  PerformanceData,
  sendPerformanceTaskData,
} from "@/lib/api/performanceTasks";

export const useSendWeeklyData = () => {
  const { session, user } = useProtectedRoute();
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
      setIsSending(false);
    },
  });

  return {
    send: mutate,
    isSending,
  };
};

export const useSendPerformanceTaskData = () => {
  const { session, user } = useProtectedRoute();
  const [isSending, setIsSending] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async ({
      stats,
      step,
    }: {
      stats: PerformanceData;
      step: number;
    }) => {
      if (!session.data || !user) {
        return;
      }

      setIsSending(true);

      await sendPerformanceTaskData({
        accessToken: session.data.user.accessToken,
        stats,
        stepInfo: { step, group: user.userDetails.Status },
      });

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            PerformanceTaskStep: parseInt(user.userDetails.PerformanceTaskStep) + 1 + "",
          },
        },
      });
    },
    onSuccess() {
      setIsSending(false);
    },
  });

  return {
    send: mutateAsync,
    isSending,
  };
};
