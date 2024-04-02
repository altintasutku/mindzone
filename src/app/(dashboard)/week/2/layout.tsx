import { weekTwoGames } from "@/assets/mockdata/weekGames/weekGames";
import WeekContainer from "@/components/game/WeekContainer";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  // return (
  //   <div className="mx-auto my-10 p-10 rounded-md bg-white dark:bg-zinc-900 max-w-[600px] font-semibold text-lg">
  //     Hafta iki çalışma altında yarın tekrar deneyin.
  //   </div>
  // );
  return <WeekContainer games={weekTwoGames}>{children}</WeekContainer>;
};

export default Layout;
