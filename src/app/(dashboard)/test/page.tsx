import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
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

  return <></>;
};

export default Page;
