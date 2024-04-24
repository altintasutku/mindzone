"use client";

import { getUser } from "@/lib/api/user";
import { ZodUser } from "@/lib/validators/user";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useProtectedRoute = () => {
  const session = useSession();
  const pathname = usePathname();
  const [user, setUser] = useState<ZodUser>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session.status === "authenticated") {
      getUser({
        accessToken: session.data.user.accessToken,
        userId: session.data.user.id,
      })
        .then((res) => {
          setUser(res);
          setIsLoading(false);
        })
        .catch((e) => {
          setError("user-not-found");
          //   router.push("/login?error=user-not-found");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, pathname]);

  return {
    user,
    session,
    isLoading,
    error,
  };
};
