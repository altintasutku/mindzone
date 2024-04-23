import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = Readonly<{ children: React.ReactNode }>;

export default async function DashboardLayout({ children }: Props) {
  const session = await getAuthSession();

  if (!session) {
      redirect("/");
  }

  try {
    await getUser({
      accessToken: session.user.accessToken!,
      userId: session.user.id!,
    });
  } catch (e) {
    redirect("/login");
  }

  return <>{children}</>;
}
