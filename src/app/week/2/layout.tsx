import { weekTwoGames } from "@/assets/weekGames";
import WeekContainer from "@/components/game/WeekContainer";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <WeekContainer games={weekTwoGames}>{children}</WeekContainer>;
};

export default Layout;
