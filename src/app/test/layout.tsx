import TestContainer from "@/components/game/TestContainer";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: Props) => {
  return <TestContainer>{children}</TestContainer>;
};

export default Layout;
