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
              WeeklyStatus:
                parseInt(user.userDetails.WeeklyStatus) >= 30
                  ? "1"
                  : parseInt(user.userDetails.WeeklyStatus) + 1 + "",
              Status:
                parseInt(user.userDetails.WeeklyStatus) >= 30
                  ? "S3"
                  : user.userDetails.Status,
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

  const { mutate } = useMutation({
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
        stats: { ...stats },
        stepInfo: { step, group: user.userDetails.Status },
      });

      await updateUser({
        accessToken: session.data.user.accessToken,
        user: {
          ...user,
          userDetails: {
            ...user.userDetails,
            PerformanceTaskStep:
              user.userDetails.PerformanceTaskStep === "5"
                ? "1"
                : parseInt(user.userDetails.PerformanceTaskStep) + 1 + "",
            Status:
              user.userDetails.PerformanceTaskStep === "5" &&
              user.userDetails.Status === "PT1"
                ? "S2"
                : user.userDetails.PerformanceTaskStep === "5" &&
                  user.userDetails.Status === "PT2"
                ? "S4"
                : user.userDetails.Status,
          },
        },
      });
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
