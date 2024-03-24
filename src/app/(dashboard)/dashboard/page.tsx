import Information from "@/components/dashboard/Information";
import WeeklyTasks from "@/components/dashboard/WeeklyTasks";
import {getUser} from "@/lib/api/user";
import {getAuthSession} from "@/lib/auth";
import {userValidator} from "@/lib/validators/user";
import {redirect} from "next/navigation";
import React from "react";
import {z} from "zod";
import {MessageCircleWarningIcon} from "lucide-react";
import {calculateDaysDiff} from "@/lib/utils";

type Props = Readonly<{
    searchParams: {
        error?: string;
    };
}>;

const DashboardPage = async ({searchParams}: Props) => {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
    }

    let user: z.infer<typeof userValidator>;
    try {
        user = await getUser({
            accessToken: session.user.accessToken!,
            userId: session.user.id!,
        });
    } catch (e) {
        redirect("/login");
    }

    if (user.userDetails.Status === "S1" || user.userDetails.Status === "S3") {
        redirect("/question/1");
    } else if (user.userDetails.Status.includes("PT")) {
        redirect(`/test/${user.userDetails.PerformanceTaskStep}`);
    } else if (
        user.userDetails.Status === "S2" ||
        user.userDetails.Status === "S4"
    ) {
        redirect("/question/2");
    }

    const remainingDay = calculateDaysDiff(new Date(user.createdOn)) % 7;

    return (
        <div className="flex flex-col px-3 sm:px-16 lg:px-32 py-3 sm:py-10 gap-4">
            <Information/>

            {searchParams && searchParams.error === "week-not-started" && (
                <div
                    className="bg-red-300 flex items-center justify-center bg-opacity-40 text-red-900 p-3 rounded-md gap-3">
                    <MessageCircleWarningIcon/>
                    <span>Hafta henüz başlamadı. <b>{remainingDay} gün</b> sonra tekrar deneyiniz.</span>
                </div>
            )}

            <WeeklyTasks/>
        </div>
    );
};

export default DashboardPage;
