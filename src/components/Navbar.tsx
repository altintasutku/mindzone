"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";
import ToggleTheme from "./ToggleTheme";
import { signOut, useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`;
};

const Navbar = () => {
  const session = useSession();

  //TODO: silinecek
  // const { data } = useQuery({
  //   queryKey: ["user"],
  //   queryFn: async () => {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/users/33`,
  //       {
  //         headers: {
  //           Token: `${session.data?.user.accessToken}`,
  //         },
  //       }
  //     );
  //     return data;
  //   },
  //   enabled: session.status === "authenticated",
  // });

  return (
    <nav className="w-full flex justify-between items-center lg:grid grid-cols-3 py-4 px-5 sm:px-[10%] bg-primary text-primary-foreground text-white">
      <Link href="/" className="flex gap-4 items-center">
        <Image
          loader={imageLoader}
          src={"brain-logo.png"}
          alt="MindZone"
          width={40}
          height={40}
          className="aspect-square w-10 h-10"
        />

        <div>
          <h1 className="text-2xl font-semibold col-span-1">MindZone</h1>
          <small className="text-xs opacity-70">
            Ruh Sağlığına Yönelik Beyin Egzersizleri
          </small>
        </div>
      </Link>

      <div className="hidden lg:flex items-center justify-center gap-1 col-span-1">
        <Link href={"/?nav=true"}>
          <Button variant={"ghost"}>Ana Sayfa</Button>
        </Link>
        <Link href={"/about"}>
          <Button variant={"ghost"}>Hakkımızda</Button>
        </Link>
        <Link href={"/contact"}>
          <Button variant={"ghost"}>İletişim</Button>
        </Link>
      </div>

      <div className="hidden lg:flex justify-end items-center gap-1 col-span-1 flex-1">

      <Link href={"/dashboard"}>
              <Button variant={"ghost"}>Gösterge Paneli</Button>
            </Link>
        {session.status === "loading" ? null : session.status ===
          "authenticated" ? (
          <>
            <Link href={"/dashboard"}>
              <Button variant={"ghost"}>Gösterge Paneli</Button>
            </Link>
            <Button variant={"ghost"} onClick={() => signOut()}>
              Çıkış Yap
            </Button>
          </>
        ) : (
          <>
            <Link href={"/register"}>
              <Button variant={"ghost"}>Kayıt Ol</Button>
            </Link>
            <Link href={"/login"}>
              <Button variant={"ghost"}>Giriş Yap</Button>
            </Link>
          </>
        )}
        {/* TODO: <LanguageSelector />  */}
        <ToggleTheme />
      </div>

      <div className="flex lg:hidden items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <MenuIcon size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent
            side={"right"}
            className="w-[200px] sm:w-[500px] flex flex-col dark:bg-zinc-900"
          >
            <h1 className="text-2xl font-semibold text-center mt-5">
              MindZone
            </h1>
            <Link href={"/?nav=true"}>
              <Button variant={"ghost"} className="w-full">
                Ana Sayfa
              </Button>
            </Link>
            <Separator />
                <Link href={"/dashboard"}>
                  <Button variant={"ghost"} className="w-full">
                    Gösterge Paneli
                  </Button>
                </Link>
            {session.status === "loading" ? null : session.status ===
              "authenticated" ? (
              <>
                <Link href={"/dashboard"}>
                  <Button variant={"ghost"} className="w-full">
                    Gösterge Paneli
                  </Button>
                </Link>
                <Button
                  variant={"ghost"}
                  className="w-full"
                  onClick={() => signOut()}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Link href={"/register"}>
                  <Button variant={"ghost"} className="w-full">
                    Kayıt Ol
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button variant={"ghost"} className="w-full">
                    Giriş Yap
                  </Button>
                </Link>
              </>
            )}
            {/* TODO: <LanguageSelector />  */}
            <ToggleTheme />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
