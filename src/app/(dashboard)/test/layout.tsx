import TestContainer from "@/components/game/TestContainer";
import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  const session = await getAuthSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUser({
    accessToken: session.user.accessToken,
    userId: session.user.id,
  });

  if (!user.userDetails.Status.includes("PT")) {
    redirect("/dashboard");
  }

  redirect(`/test/${user.userDetails.PerformanceTaskStep || 1}`);
  return <TestContainer>{children}</TestContainer>;
};

export default Layout;
