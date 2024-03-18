"use client";

import { RegisterType, registerValidator } from "@/lib/validators/auth";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Form, FormDescription, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "../ui/checkbox";
import CustomFormField from "./CustomFormField";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterForm = () => {
  const router = useRouter();

  const { mutate: register, isPending } = useMutation({
    mutationFn: async (values: RegisterType) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        {
          ...values,
          age: parseInt(values.age),
          contactType: parseInt(values.contactType),
          status: "S1",
          weeklyStatus: "1",
          performanceTaskStep: "1",
          isActive: true,
          userType: 0,
        }
      );

      return data as { id: number };
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  const [formAccepted, setFormAccepted] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);

  const form = useForm<RegisterType>({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      psychologicalHistory: "",
      chronicIllness: "",
    },
  });

  function onSubmit(values: RegisterType) {
    if (!values.psychologicalHistory) {
      values.psychologicalHistory = "-";
    }

    if (!values.chronicIllness) {
      values.chronicIllness = "-";
    }

    register(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="gap-2 flex flex-col sm:grid grid-cols-2 w-full sm:w-auto"
      >
        <CustomFormField form={form} name="name" small>
          {({ field }) => <Input placeholder="İsim" {...field} />}
        </CustomFormField>
        <CustomFormField form={form} name="surname" small>
          {({ field }) => <Input placeholder="Soyisim" {...field} />}
        </CustomFormField>
        <CustomFormField form={form} name="email" small>
          {({ field }) => <Input placeholder="Email" {...field} />}
        </CustomFormField>
        <CustomFormField form={form} name="phone" small>
          {({ field }) => (
            <Input placeholder="Telefon (+90 555 555 55 55)" {...field} />
          )}
        </CustomFormField>
        <CustomFormField form={form} name="password">
          {({ field }) => (
            <Input placeholder="Şifre" type="password" {...field} />
          )}
        </CustomFormField>
        <CustomFormField form={form} name="age">
          {({ field }) => <Input placeholder="Yaş" {...field} />}
        </CustomFormField>
        <CustomFormField form={form} name="gender" small>
          {({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Cinsiyet" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Erkek">Erkek</SelectItem>
                <SelectItem value="Kadın">Kadın</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CustomFormField>
        <CustomFormField form={form} name="education" small>
          {({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Eğitim Durumu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ortaokul">Ortaokul</SelectItem>
                <SelectItem value="Lise">Lise</SelectItem>
                <SelectItem value="Ön Lisans">Ön Lisans</SelectItem>
                <SelectItem value="Lisans">Lisans</SelectItem>
                <SelectItem value="Yüksek Lisans">Yüksek Lisans</SelectItem>
                <SelectItem value="Doktora">Doktora</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CustomFormField>
        <CustomFormField form={form} name="physicalCondition">
          {({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Fiziksel - Kronik Rahatsızlıklar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Evet">Evet</SelectItem>
                <SelectItem value="Hayır">Hayır</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CustomFormField>
        <CustomFormField form={form} name="chronicIllness" small>
          {({ field }) => (
            <Textarea
              placeholder="Fiziksel - Kronik Rahatsızlıklar"
              className="resize-none"
              {...field}
            />
          )}
        </CustomFormField>
        <CustomFormField form={form} name="psychologicalHistory" small>
          {({ field }) => (
            <Textarea
              placeholder="Psikolojik/Psikiyatrik Geçmiş"
              className="resize-none"
              {...field}
            />
          )}
        </CustomFormField>
        <CustomFormField form={form} name="contactType">
          {({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Size nasıl ulaşmamızı tercih edersiniz?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Telefon - Arama</SelectItem>
                <SelectItem value="1">Telefon - Whatsapp</SelectItem>
                <SelectItem value="2">E-posta</SelectItem>
              </SelectContent>
            </Select>
          )}
        </CustomFormField>
        <CustomFormField form={form} name="approveJoining">
          {({ field }) => (
            <div className="flex items-center p-2 gap-2 bg-white dark:bg-zinc-900">
              <Checkbox
                checked={formAccepted}
                onCheckedChange={() => setFormAccepted(!formAccepted)}
              />
              <div className="space-y-1 leading-none">
                <FormLabel>Çalışmaya katılmayı kabul ediyorum</FormLabel>
                <FormDescription className="hidden sm:block">
                  Çalışmaya katılmayı kabul ediyorum ve bu formda verdiğim
                  bilgilerin araştırma amacıyla kullanılmasına izin veriyorum.
                </FormDescription>
              </div>
            </div>
          )}
        </CustomFormField>
        <CustomFormField form={form} name="approveKVKK">
          {({ field }) => (
            <div className="flex items-center p-2 gap-2 bg-white dark:bg-zinc-900">
              <Checkbox
                checked={kvkkAccepted}
                onCheckedChange={() => setKvkkAccepted(!kvkkAccepted)}
              />
              <div className="space-y-1 leading-none">
                <FormLabel>
                  <Link
                    className="underline"
                    href={process.env.NEXT_PUBLIC_ASSETS_URL + "/KVKK.docx"}
                  >
                    KVKK ve Açık Rıza Beyanı
                  </Link>
                </FormLabel>
                <FormDescription className="hidden sm:block">
                  Bunu da kayıt kısmında Kişisel Verileri Koruma Kanunu
                  Bilgilendirmesi onaylıyorum
                </FormDescription>
              </div>
            </div>
          )}
        </CustomFormField>

        <Button
          disabled={!formAccepted || isPending || !kvkkAccepted}
          type="submit"
          className="col-span-2"
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : "Kayıt Ol"}
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
