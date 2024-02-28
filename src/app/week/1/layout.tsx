import Container from "@/components/game/Container";
import React from "react";

const games: Game[] = [
  {
    title: "Digit Span",
    isCompleted: false,
    slug: "digit-span",
    week: "1",
  },
  {
    title: "Cognitive Flexibility",
    isCompleted: false,
    slug: "cognitive-flexbility",
    week: "1",
  },
  {
    title: "Inhibition",
    isCompleted: false,
    slug: "inhibition",
    week: "1",
  },
  {
    title: "Director Task",
    isCompleted: false,
    slug: "director-task",
    week: "1",
  },
  {
    title: "Affective Empathy",
    isCompleted: false,
    slug: "affective-empathy",
    week: "1",
  },
];

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <Container games={games}>{children}</Container>;
};

export default Layout;
