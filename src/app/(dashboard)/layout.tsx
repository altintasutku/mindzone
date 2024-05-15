"use client";

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function DashboardLayout({ children }: Props) {
  const { session, user, error } = useProtectedRoute();
  const router = useRouter();
  const pathname = usePathname();

  if (!session) {
    router.push("/login");
    return null;
  }

  if (session.status === "loading") {
    return <Loader2Icon size={64} className="animate-spin mx-auto" />;
  }

  if (error) {
    router.push("/login?error=" + error);
    return null;
  }

  if (!user || !user.userDetails.Status) {
    return null;
  }

  if (
    (user.userDetails.Status.includes("S1") ||
      user.userDetails.Status.includes("S3")) &&
    pathname !== "/question/1"
  ) {
    router.push("/question/1");
    return null;
  } else if (
    (user.userDetails.Status.includes("S2") ||
      user.userDetails.Status.includes("S4")) &&
    pathname !== "/question/2"
  ) {
    router.push("/question/2");
    return null;
  } else if (
    user.userDetails.Status.includes("PT") &&
    !pathname.includes("/test")
  ) {
    router.push(`/test/${user.userDetails.PerformanceTaskStep}`);
    return null;
  } else if (user.userDetails.Status === "F" && pathname !== "/finish") {
    router.push("/finish");
    return null;
  }

  console.log(user.userDetails.Status, pathname);

  return <>{children}</>;
}
