import TestContainer from "@/components/game/TestContainer";
import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { ZodUser } from "@/lib/validators/user";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = async ({ children }: Props) => {
  const session = await getAuthSession();
  const header = headers();
  const pathname = header.get("next-url");

  if (!session) {
    redirect("/login");
  }

  let user: ZodUser;
  try {
    user = await getUser({
      accessToken: session.user.accessToken,
      userId: session.user.id,
    });
  } catch (e) {
    redirect("/login");
  }

  if (!user.userDetails.Status.includes("PT")) {
    redirect("/dashboard");
  }

  return <TestContainer>{children}</TestContainer>;
};

export default Layout;
