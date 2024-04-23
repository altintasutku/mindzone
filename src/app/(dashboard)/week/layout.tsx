import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { calculateDaysDiff } from "@/lib/utils";
import {
  weekFourGames,
  weekOneGames,
  weekThreeGames,
  weekTwoGames,
} from "@/assets/mockdata/weekGames/weekGames";
import { getAuthSession } from "@/lib/auth";
import { getUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";
import { log } from "console";

const weekGames = [weekOneGames, weekTwoGames, weekThreeGames, weekFourGames];

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  const header = headers();
  const pathname = header.get("next-url");

  if (!pathname) {
    redirect("/dashboard");
  }

  if (!session) {
    redirect("/login");
  }

  let user: ZodUser;
  try {
    user = await getUser({
      accessToken: session.user.accessToken!,
      userId: session.user.id!,
    });
  } catch (e) {
    redirect("/login");
  }

  if (!user || !user.userDetails.WeeklyStatus) {
    return null;
  }

  if (parseInt(user.userDetails.UserType) === 0) {
    redirect("/dashboard");
  }

  if (!user.userDetails.Status.includes("W")) {
    redirect("/dashboard");
  }

  const week = Math.ceil(parseInt(user.userDetails.WeeklyStatus) / 5);
  const remainingDay = calculateDaysDiff(new Date(user.createdOn));

  const gameIndex =
    parseInt(user.userDetails.WeeklyStatus) % 5 === 0
      ? 4
      : (parseInt(user.userDetails.WeeklyStatus) % 5) - 1;
  const gameSlug = weekGames[week - 1][gameIndex].slug;
  const gameUrl = `/week/${week}/${gameSlug}`;

  // If user tries to access the game before the week starts, redirect to dashboard
  if (remainingDay < (week - 1) * 7) {
    redirect("/dashboard?error=week-not-started");
  }

  const pathnameSplit = pathname.split("/");

  if (pathnameSplit[2] !== week.toString()) {
    redirect(`/week/${week}`);
  }

  if (pathnameSplit[3] && pathnameSplit[3] !== gameSlug) {
    redirect(gameUrl);
  }

  return <>{children}</>;
};

export default Layout;
