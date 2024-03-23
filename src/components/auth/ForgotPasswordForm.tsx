"use client";

import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Loader2Icon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";

const ForgotPasswordForm = () => {
  const [email, setEmail] = React.useState("");

  const isEmailValid = z.string().email().safeParse(email).success;

  const { isPending, mutate, isSuccess } = useMutation({
    mutationFn: async () => {
      if (!isEmailValid) return;

      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/api/authentication/forgot-password`, {
        email,
      });
    },
  });

  return (
    <form className="gap-2 flex flex-col w-full sm:w-auto">
      {isSuccess && (
        <p className="text-green-500 text-center">
          Sıfırlanmış şifreniz e-posta adresinize gönderildi.
        </p>
      )}

      <Input
        placeholder="E-posta"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        type="button"
        className="col-span-2"
        onClick={() => mutate()}
        disabled={isPending || !isEmailValid}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : "Gönder"}
      </Button>
    </form>
  );
};

export default function LoginForm() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
