"use client";

import TestContainer from "@/components/game/TestContainer";
import { useUserStore } from "@/hooks/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: Props) => {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const pathname = usePathname();

  if (!user || !user.userDetails.Status) {
    return null;
  }

  if (!user.userDetails.Status.includes("PT")) {
    router.push("/dashboard");    
  }

  if(pathname !== "/test/" + user.userDetails.PerformanceTaskStep) {
    router.push("/test/" + user.userDetails.PerformanceTaskStep);
  }

  if(pathname === "/test"){
    router.push("/test/" + user.userDetails.PerformanceTaskStep);
  }

  return <TestContainer>{children}</TestContainer>;
};

export default Layout;
