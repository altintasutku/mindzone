"use client"

import { useProtectedRoute } from "@/hooks/useProtectedRoute";
import { Loader2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const QuestionLayout = ({ children }: Props) => {
  const { session, user, error } = useProtectedRoute();
  const router = useRouter();

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

  if (!user.userDetails.Status.includes("S")) {
    router.push("/dashboard");
    return null;
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
