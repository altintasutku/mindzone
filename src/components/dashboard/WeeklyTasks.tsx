import React from "react";
import {Progress} from "../ui/progress";
import {Button, buttonVariants} from "../ui/button";
import {InfoIcon, LockIcon} from "lucide-react";
import {weeks} from "@/assets/mockdata/progresses/weeks";
import WeeklyTasksImage from "./WeeklyTasksImage";
import Link from "next/link";
import {calculateDaysDiff, cn} from "@/lib/utils";
import {getUser} from "@/lib/api/user";
import {getAuthSession} from "@/lib/auth";
import {redirect} from "next/navigation";
import {z} from "zod";
import {userValidator} from "@/lib/validators/user";

const WeeklyTasks = async () => {
    const session = await getAuthSession();

    if (!session) {
        redirect("/login");
        return null;
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

    const notCeiled = parseInt(user.userDetails.WeeklyStatus) / 5;

    const weekNumber = Math.ceil(notCeiled);
    const remainingDay = calculateDaysDiff(new Date(user.createdOn));

    return (
        <section className="dark:bg-zinc-900 shadow text-center pt-5 rounded-md space-y-5">
            <h1 className="font-semibold text-xl">Haftalık Görevlerim</h1>
            {parseInt(user.userDetails.UserType) === 0 && (
                <div className={"flex items-center justify-center gap-4 p-4 bg-blue-500 text-white mx-10 rounded-md"}>
                    <InfoIcon />
                    Egzersizlerimiz sizler için hazırlanıyor. Yakında başlayacaksınız!
                </div>
            )}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-4">
                {weeks.map((week, index) => {
                    const isActiveWeek = weekNumber === index + 1;
                    const percentage = (parseInt(user.userDetails.WeeklyStatus) - 1) % 5 * 20

                    const progress =
                        isActiveWeek
                            ? percentage
                            : weekNumber > index + 1
                                ? 100
                                : -1;

                    let isWeekAccessible = (index) * 7 < remainingDay && progress !== -1;

                    if (parseInt(user.userDetails.UserType) === 0) {
                        isWeekAccessible = false;
                    }

                    return (
                        <div
                            key={index}
                            className="cursor-pointer border overflow-hidden border-neutral-200 dark:border-neutral-600 rounded-xl flex flex-col items-center gap-3 py-3 shadow-md hover:shadow-lg transition-all relative"
                        >
                            <div className="flex w-full items-center justify-center">
                                <Progress
                                    value={progress}
                                    className="w-full mx-5"
                                    indicatorColor={
                                        progress === 100 ? "bg-green-700" : "bg-primary"
                                    }
                                    showValue
                                />
                            </div>
                            <div className="flex items-center justify-center">
                                <WeeklyTasksImage week={week} weekNumber={index + 1}/>
                            </div>
                            <div className="flex w-full items-center justify-center">
                                <span className="font-bold">{index + 1}. Hafta</span>
                            </div>
                            <div className="flex w-full px-5">
                                <>
                                    {!isWeekAccessible ? (
                                        <Button className="w-full" variant={"outline"}>
                                            Kilitli
                                        </Button>
                                    ) : progress === 100 ? (
                                        <Button className="w-full bg-green-700 hover:bg-green-700">
                                            Bitti
                                        </Button>
                                    ) : (
                                        <Link
                                            href={"/week/" + (index + 1)}
                                            className={cn("w-full", buttonVariants())}
                                        >
                                            Devam Et
                                        </Link>
                                    )}
                                </>
                            </div>

                            {!isWeekAccessible && (
                                <div
                                    className="absolute w-full h-full bg-black/40 backdrop-blur-sm z-40 inset-0 flex justify-center items-center text-white">
                                    {parseInt(user.userDetails.UserType) === 0 ?
                                        <LockIcon size={64} className="text-yellow-500"/>
                                        : Math.floor((remainingDay + 7) / 7) === index ?
                                            <div className="font-bold flex flex-col items-center">
                                                <h3 className="text-5xl">{
                                                    remainingDay % 7 === 0 ? 7 : 7 - remainingDay % 7
                                                }</h3>
                                                <span>gün sonra açılacak</span>
                                            </div> : (index) * 7 < remainingDay ?
                                                <div className={"p-4"}>
                                                    Bir önceki haftayı bitirerek devam edebilirsiniz.
                                                </div> :
                                                <LockIcon size={64} className="text-yellow-500"/>}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WeeklyTasks;
