import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const QuestionLayout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center py-5">
      <div className="bg-white dark:bg-zinc-900 p-5 shadow rounded-md">{children}</div>
    </div>
  );
};

export default QuestionLayout;
