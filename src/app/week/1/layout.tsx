import { weekOneGames } from "@/assets/weekGames";
import WeekContainer from "@/components/game/WeekContainer";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <WeekContainer games={weekOneGames}>{children}</WeekContainer>;
};

export default Layout;
