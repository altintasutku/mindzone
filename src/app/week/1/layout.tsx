import { weekOneGames } from "@/assets/weekGames";
import Container from "@/components/game/Container";
import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <Container games={weekOneGames}>{children}</Container>;
};

export default Layout;
