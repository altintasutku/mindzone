"use client";

import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { ZodUser } from "@/lib/validators/user";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = Readonly<{ children: React.ReactNode }>;

export default function DashboardLayout({ children }: Props) {
  const session = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = React.useState<ZodUser>();

  useEffect(() => {
    if (session.status === "authenticated") {
      getUser({
        accessToken: session.data.user.accessToken,
        userId: session.data.user.id,
      })
        .then((res) => {
          setUser(res);
        })
        .catch((e) => {
          router.push("/login?error=user-not-found");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  if (!session) {
    router.push("/login");
  }

  if (session.status === "loading") {
    return <Loader2Icon size={64} className="animate-spin mx-auto" />;
  }

  if (!user || !user.userDetails.Status) {
    return null;
  }

  if (
    user.userDetails.Status.includes("S1") ||
    (user.userDetails.Status.includes("S3") && pathname !== "/question/1")
  ) {
    router.push("/question/1");
  } else if (
    user.userDetails.Status.includes("S2") ||
    (user.userDetails.Status.includes("S3") && pathname !== "/question/2")
  ) {
    router.push("/question/2");
  } else if (user.userDetails.Status.includes("PT") && !pathname.includes("/test")) {
    router.push(`/test/${user.userDetails.PerformanceTaskStep}`);
  }

  return <>{children}</>;
}
