"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon, LockIcon } from "lucide-react";
import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Tab = "security" | "email" | "profile";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState<Tab>("security");

  const session = useSession();

  const router = useRouter();

  if (session.status === "loading")
    return (
      <div>
        <Loader2Icon className="animate-spin" />
      </div>
    );

  if (session.status === "unauthenticated" || !session.data) {
    router.push("/login");
    return null;
  }

  return (
    <div className="flex w-full h-full justify-center items-center py-4">
      <div className="flex w-full sm:w-3/4 xl:w-2/4 bg-white dark:bg-zinc-900 shadow rounded-md">
        <nav className="hidden sm:block border-r border-r-gray-400 py-4 space-y-2 min-w-56">
          <h1 className="text-center font-semibold text-lg">Ayarlar</h1>
          <Separator />
          <h2 className="text-center">Hesap Ayarları</h2>
          <Button
            variant="ghost"
            onClick={() => setActiveTab("security")}
            className={cn("w-full rounded-none", {
              "bg-gray-200 dark:bg-gray-700": activeTab === "security",
            })}
          >
            <LockIcon className="mr-2s" />
            Güvenlik
          </Button>
        </nav>
        <div className="w-full">
          {activeTab === "security" && (
            <PasswordTab sessionData={session.data} />
          )}
        </div>
      </div>
    </div>
  );
};

const PasswordTab = ({ sessionData }: { sessionData: Session }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const router = useRouter();

  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/authentication/change-password`,
        {
          currentPassword: oldPassword,
          newPassword: password,
        },
        {
          headers: {
            Token: sessionData.user.accessToken,
          },
        }
      );

      router.refresh();
    },
    onSuccess: () => {
      signIn("credentials", {
        email: sessionData.user.email,
        password: password,
        callbackUrl: "/settings",
      });
      toast({
        title: "Şifre başarıyla değiştirildi!",
        variant: "success",
        duration: 3000,
      });
    },
  });

  return (
    <div className="flex flex-col justify-center w-full p-10">
      <h1 className="text-xl font-semibold">Güvenlik Ayarları</h1>
      <Separator />
      <div className="p-7 my-10 text-center flex flex-col gap-5 border border-slate-200 dark:border-slate-600 rounded-md">
        <h2 className="text-lg">Şifre Değiştir</h2>
        <span>Eski şifre</span>
        <Input
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          type="password"
        />
        <span>Yeni şifre</span>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        <span>Yeni şifre tekrar</span>
        <Input
          value={passwordAgain}
          onChange={(e) => setPasswordAgain(e.target.value)}
        />
        <Button
          disabled={
            isPending ||
            password.length < 8 ||
            password !== passwordAgain ||
            !oldPassword
          }
          onClick={() => mutate()}
        >
          Şifreyi Değiştir
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;
