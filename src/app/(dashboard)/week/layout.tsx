"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import {calculateDaysDiff} from "@/lib/utils";
import {weekOneGames, weekThreeGames, weekTwoGames} from "@/assets/mockdata/weekGames/weekGames";

const weekGames = [weekOneGames,weekTwoGames,weekThreeGames];

const Layout = ({children}: { children: React.ReactNode }) => {
    const user = useUserStore((state) => state.user);

    const pathname = usePathname();
    const router = useRouter();
    if (!user || !user.userDetails.WeeklyStatus) {
        return null;
    }

    if (parseInt(user.userDetails.UserType) === 0) {
        router.push("/dashboard");
        return null;
    }

    // If user is not in weekly status, redirect to dashboard
    if (!user.userDetails.Status.includes("W")) {
        router.push("/dashboard");
    }

    const week = Math.ceil(parseInt(user.userDetails.WeeklyStatus) / 5);
    const remainingDay = calculateDaysDiff(new Date(user.createdOn));

    const gameIndex = parseInt(user.userDetails.WeeklyStatus) % 5 === 0 ? 4 : parseInt(user.userDetails.WeeklyStatus) % 5 - 1;
    const gameSlug = weekGames[week - 1][gameIndex].slug;
    const gameUrl = `/week/${week}/${gameSlug}`;

    // If user tries to access the game before the week starts, redirect to dashboard
    if (remainingDay < (week - 1) * 7) {
        router.push("/dashboard?error=week-not-started");
        return null;
    }

    const pathnameSplit = pathname.split("/");

    if (pathnameSplit[2] !== week.toString()) {
        router.push(`/week/${week}`);
        return null;
    }

    if (pathnameSplit[3] && pathnameSplit[3] !== gameSlug){
        router.push(gameUrl);
        return null;
    }

    return <>{children}</>;
};

export default Layout;
