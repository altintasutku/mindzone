"use client";

import { LoginType } from "@/lib/validators/auth";
import React, { Suspense, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginFormInner = () => {
  const [isPending, setIsPending] = React.useState(false);
  const params = useSearchParams();

  const router = useRouter();

  const error = params.get("error") as string;

  const login = async (credentials: LoginType) => {
    setIsPending(true);
    try {
      signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error(error);
      router.push("/login?error=true");
    }
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <form className="gap-2 flex flex-col w-full sm:w-auto">
      {error && (
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
        onClick={() => login({ email, password })}
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
