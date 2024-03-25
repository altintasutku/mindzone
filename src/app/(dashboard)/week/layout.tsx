"use client";

import {useUserStore} from "@/hooks/useUserStore";
import {usePathname, useRouter} from "next/navigation";
import React from "react";
import {calculateDaysDiff} from "@/lib/utils";

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

    // If user tries to access the game before the week starts, redirect to dashboard
    if (remainingDay < (week - 1) * 7) {
        router.push("/dashboard?error=week-not-started");
        return null;
    }

    if (pathname.split("/")[2] !== week.toString()) {
        router.push(`/week/${week}`);
        return null;
    }

    return <>{children}</>;
};

export default Layout;
