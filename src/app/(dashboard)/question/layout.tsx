import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const QuestionLayout = async ({ children }: Props) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  let user;
  try {
    user = await getUser({
      accessToken: session.user.accessToken!,
      userId: session.user.id!,
    });
  } catch (e) {
    redirect("/auth/logout");
  }

  if (!user.userDetails.Status.includes("S")) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center items-center py-5">
      <div className="bg-white dark:bg-zinc-900 p-5 shadow rounded-md">
        {children}
      </div>
    </div>
  );
};

export default QuestionLayout;
