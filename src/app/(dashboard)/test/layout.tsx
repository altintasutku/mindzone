"use client";

import TestContainer from "@/components/game/TestContainer";
import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { getUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: Props) => {
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

  if (!user.userDetails.Status.includes("PT")) {
    router.push("/dashboard");
    return null;
  }

  const url = `/test/${user.userDetails.PerformanceTaskStep}`;

  if (pathname !== url) {
    router.push(url);
  }

  return <TestContainer>{children}</TestContainer>;
};

export default Layout;
