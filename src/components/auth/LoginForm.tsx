"use client";

import { LoginType } from "@/lib/validators/auth";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [isPending, setIsPending] = React.useState(false);
  const params = useSearchParams();

  const error = params.get("error") as string;

  const login = async (credentials: LoginType) => {
    setIsPending(true);
    signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      callbackUrl: "/",
    });
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
        disabled={isPending}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Giriş Yap"}
      </Button>
    </form>
  );
};

export default LoginForm;
