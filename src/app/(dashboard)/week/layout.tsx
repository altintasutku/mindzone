"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const user = useUserStore((state) => state.user);

  const pathname = usePathname();
  const router = useRouter();

  if (!user.userDetails.WeeklyStatus) {
    return null;
  }

  const url = `/week/${
    Math.floor(parseInt(user.userDetails.WeeklyStatus) / 5) + 1
  }`;

  if (!pathname.startsWith(url)) {
    router.push(url);
  }

  return <>{children}</>;
};

export default Layout;
