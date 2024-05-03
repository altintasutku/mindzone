import {
  weekFiveGames,
  weekFourGames,
  weekSixGames,
} from "@/assets/mockdata/weekGames/weekGames";
import WeekContainer from "@/components/game/WeekContainer";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <WeekContainer games={weekSixGames}>{children}</WeekContainer>;
};

export default Layout;
