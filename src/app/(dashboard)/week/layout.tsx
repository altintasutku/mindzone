"use client";

import {
  weekOneGames,
  weekThreeGames,
  weekTwoGames,
} from "@/assets/mockdata/weekGames/weekGames";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/hooks/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const weekGames = [weekOneGames, weekTwoGames, weekThreeGames];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  const { toast } = useToast();

  const pathname = usePathname();
  const router = useRouter();

  if (!user || !user.userDetails.WeeklyStatus) {
    return null;
  }

  if (!user.userDetails.Status.includes("W")) {
    router.push("/dashboard");
  }

  const week = Math.ceil(parseInt(user.userDetails.WeeklyStatus) / 5);

  const gameName = weekGames[week - 1].at(
    (parseInt(user.userDetails.WeeklyStatus) % 5) - 1
  );

  const url = `/week/${week}/${gameName?.slug}`;

  if (!pathname.startsWith(url)) {
    router.push(url);
  }

  const day = Date.now() - new Date(user.createdOn).getTime();

  if (day < 7 * 24 * 60 * 60 * 1000 * (week - 1)) {
    router.push("/dashboard");
    toast({
      title: "Bu oyuna henüz başlayamazsınız",
      description: "Bu haftanın oyunlarına başlamak için biraz daha beklemeniz gerekiyor.",
      variant: "destructive",
      duration: 5000,
    });
  }

  return <>{children}</>;
};

export default Layout;
