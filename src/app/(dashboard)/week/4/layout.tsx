import { weekFourGames } from "@/assets/mockdata/weekGames/weekGames";
import WeekContainer from "@/components/game/WeekContainer";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <WeekContainer games={weekFourGames}>{children}</WeekContainer>;
};

export default Layout;
