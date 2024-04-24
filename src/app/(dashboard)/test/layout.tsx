"use client";

import TestContainer from "@/components/game/TestContainer";
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
