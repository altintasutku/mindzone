"use client"

import { getUser } from "@/lib/api/user";
import { getAuthSession } from "@/lib/auth";
import { userValidator, ZodUser } from "@/lib/validators/user";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { z } from "zod";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const QuestionLayout = ({ children }: Props) => {
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

  if (!user.userDetails.Status.includes("S")) {
    router.push("/dashboard");
    return null;
  }

  const url = `/question/${user.userDetails.Status.split("")[1]}`;

  if (pathname !== url) {
    router.push(url);
  }

  return (
    <div className="flex justify-center items-center py-5">
      <div className="bg-white dark:bg-zinc-900 p-5 shadow rounded-md">
        {children}
      </div>
    </div>
  );
};

export default QuestionLayout;
