import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = Readonly<{ children: React.ReactNode }>;

export default async function DashboardLayout({ children }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/register");
    return null;
  }

  return <>{children}</>;
}
