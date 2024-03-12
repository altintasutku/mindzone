"use client";

import { LoginType, loginValidator } from "@/lib/validators/auth";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "../ui/input";
import CustomFormField from "./CustomFormField";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  // const { mutate: login, isPending } = useMutation({
  //   mutationFn: async (credentials: LoginType) => {
  //     console.log(credentials);
      
  //     const { data } = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/authentication`,
  //       {
  //         username: credentials.email,
  //         password: credentials.password,
  //       }
  //     );

  //     console.log("data", data);

  //     return data;
  //   },
  // });

  const [isPending, setIsPending] = React.useState(false);

  const login = async (credentials: LoginType) => {
    setIsPending(true);
    signIn("credentials",{
      email: credentials.email,
      password: credentials.password,
      callbackUrl: "/",
    })
  }

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <form className="gap-2 flex flex-col w-full sm:w-auto">
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
