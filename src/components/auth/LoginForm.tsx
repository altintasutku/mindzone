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

const LoginForm = () => {
  const { mutate: login, isPending } = useMutation({
    mutationFn: async (credentials: LoginType) => {
      const { data } = await axios.post(
        (process.env.NEXT_PUBLIC_API_URL as string) + "/auth/authentication",
        {
          credentials,
        }
      );
      return data;
    },
  });

  const form = useForm<LoginType>({
    resolver: zodResolver(loginValidator),
    defaultValues: {},
  });

  function onSubmit(values: LoginType) {
    login(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-2 flex flex-col sm:grid grid-cols-2 w-full sm:w-auto"
      >
        <CustomFormField form={form} name="username">
          {({ field }) => <Input placeholder="E-posta" {...field} />}
        </CustomFormField>
        <CustomFormField form={form} name="password">
          {({ field }) => (
            <Input placeholder="Şifre" type="password" {...field} />
          )}
        </CustomFormField>

        <Button
          type="submit"
          className="col-span-2"
          disabled={isPending || !form.formState.isValid}
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : "Giriş Yap"}
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
