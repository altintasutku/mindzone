"use client";

import { useUserStore } from "@/hooks/useUserStore";
import { getUser } from "@/lib/api/user";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = Readonly<{ children: React.ReactNode }>;

export default function DashboardLayout({ children }: Props) {
  const session = useSession();
  const router = useRouter();

  const setUser = useUserStore((state) => state.setUser);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try{
        const data = await getUser({
          accessToken: session.data?.user.accessToken!,
          userId: session.data?.user.id!,
        });
        return data;
      }catch(e){
        signOut();
        return null;
      }
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
      router.push("/");
  }

  return <>{children}</>;
}
