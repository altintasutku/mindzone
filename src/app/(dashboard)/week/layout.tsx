"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { calculateDaysDiff } from "@/lib/utils";
import {
  weekFourGames,
  weekOneGames,
  weekThreeGames,
  weekTwoGames,
} from "@/assets/mockdata/weekGames/weekGames";
import { getUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";
import { useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";

const weekGames = [weekOneGames, weekTwoGames, weekThreeGames, weekFourGames];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<ZodUser>();

  useEffect(() => {
    if (session.status === "authenticated") {
      getUser({
        accessToken: session.data.user.accessToken,
        userId: session.data.user.id,
      })
        .then((res) => {
          setUser(res);
        })
        .catch((e) => {
          router.push("/login?error=user-not-found");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if(session.status === "loading") {
    return <Loader2Icon size={64} className="animate-spin mx-auto" />;
  }

  if (!user || !user.userDetails.WeeklyStatus) {
    return null;
  }

  if (parseInt(user.userDetails.UserType) === 0) {
    router.push("/dashboard");
    return null;
  }

  if (!user.userDetails.Status.includes("W")) {
    router.push("/dashboard");
    return null;
  }

  const week = Math.ceil(parseInt(user.userDetails.WeeklyStatus) / 5);
  const remainingDay = calculateDaysDiff(new Date(user.createdOn));

  const gameIndex =
    parseInt(user.userDetails.WeeklyStatus) % 5 === 0
      ? 4
      : (parseInt(user.userDetails.WeeklyStatus) % 5) - 1;
  const gameSlug = weekGames[week - 1][gameIndex].slug;
  const gameUrl = `/week/${week}/${gameSlug}`;

  // If user tries to access the game before the week starts, router.push to dashboard
  if (remainingDay < (week - 1) * 7) {
    router.push("/dashboard?error=week-not-started");
    return null;
  }

  const pathnameSplit = pathname.split("/");

  if (pathnameSplit[2] !== week.toString()) {
    router.push(`/week/${week}`);
    return null;
  }

  const gameName = weekGames[week - 1].at(
    (parseInt(user.userDetails.WeeklyStatus) % 5) - 1
  );

  const url = `/week/${week}/${gameName?.slug}`;

  if (pathname !== url) {
    router.push(url);
    return null;
  }

  return <>{children}</>;
};

export default Layout;
