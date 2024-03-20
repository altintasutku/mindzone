"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { getUser } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = Readonly<{ children: React.ReactNode }>;

export default function DashboardLayout({ children }: Props) {
  const session = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const data = await getUser({
        accessToken: session.data?.user.accessToken!,
        userId: session.data?.user.id!,
      });
      return data;
    },
    enabled: session.status === "authenticated",
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  if (session.status === "loading" || isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="bg-white dark:bg-zinc-900 m-5 p-4 rounded-md shadow w-full md:max-w-[80%] flex justify-center items-center">
          <Loader2Icon className="animate-spin h-10 w-10" />
        </div>
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  if (pathname !== "/dashboard") {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  if (user.userDetails.Status === "S1" || user.userDetails.Status === "S3") {
    router.push("/question/1");
  } else if (user.userDetails.Status.includes("PT")) {
    router.push(`/test/${user.userDetails.PerformanceTaskStep}`);
  } else if (
    user.userDetails.Status === "S2" ||
    user.userDetails.Status === "S4"
  ) {
    router.push("/question/2");
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
}
