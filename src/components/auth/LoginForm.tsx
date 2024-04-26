"use client";

import { LoginType } from "@/lib/validators/auth";
import React, { Suspense, use, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";

const LoginFormInner = () => {
  const params = useSearchParams();
  const router = useRouter();
  const error = params.get("error") as string;

  const [isPending, setIsPending] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const { success } = z
      .object({
        email: z.string().email(),
        password: z.string().min(8),
      })
      .safeParse({ email, password });

    if (!success) {
      return;
    }

    setIsPending(true);
    try {
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      router.push("/login?error=true");
    }
  };

  return (
    <form className="gap-2 flex flex-col w-full sm:w-auto">
      {error && error !== "user-not-found" && (
        <p className="text-red-500 text-sm text-center">
          E-posta veya şifre hatalı
        </p>
      )}

      <Input
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Şifre"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        type="button"
        onClick={login}
        className="col-span-2"
        disabled={isPending || !email || !password}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Giriş Yap"}
      </Button>
    </form>
  );
};

export default function LoginForm() {
  return (
    <Suspense>
      <LoginFormInner />
    </Suspense>
  );
}
