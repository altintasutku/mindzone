"use client";

import Link from "next/link";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  CircleUserRoundIcon,
  HomeIcon,
  InfoIcon,
  LayoutDashboardIcon,
  Loader2Icon,
  LockIcon,
  LogOutIcon,
  MenuIcon,
  PhoneIcon,
  SettingsIcon,
  UserPlus2Icon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";
import ToggleTheme from "./ToggleTheme";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`;
};

const Navbar = () => {
  const session = useSession();

  return (
    <nav className="w-full flex justify-between items-center lg:grid grid-cols-3 py-4 px-5 sm:px-[10%] bg-primary text-primary-foreground text-white">
      <Link href="/?nav=true" className="flex gap-4 items-center">
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
        {session.status === "loading" ? (
          <Loader2Icon size={24} className="animate-spin mr-8" />
        ) : session.status === "authenticated" ? (
          <>
            <Link href={"/dashboard"}>
              <Button variant={"ghost"}>Gösterge Paneli</Button>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "ghost" })}
              >
                <CircleUserRoundIcon size={24} />
                <span className="mx-1">/</span>
                <SettingsIcon size={24} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Hoşgeldin {session.data.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Ayarlar</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link href={"/settings"} className="flex items-center">
                    <LockIcon size={24} className="mr-2" />
                    <span>Güvenlik Ayarları</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOutIcon size={24} className="mr-2" />
                  <span>Çıkış Yap</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ToggleTheme className="w-full" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link href={"/register"}>
              <Button variant={"ghost"}>Kayıt Ol</Button>
            </Link>
            <Link href={"/login"}>
              <Button variant={"ghost"}>Giriş Yap</Button>
            </Link>
            <ToggleTheme />
          </>
        )}
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
                <HomeIcon size={24} className="mr-2" />
                Ana Sayfa
              </Button>
            </Link>
            <Link href={"/about"}>
              <Button variant={"ghost"} className="w-full">
                <InfoIcon size={24} className="mr-2" />
                Hakkımızda
              </Button>
            </Link>
            <Link href={"/contact"}>
              <Button variant={"ghost"} className="w-full">
                <PhoneIcon size={24} className="mr-2" />
                İletişim
              </Button>
            </Link>
            <Separator />
            {session.status === "loading" ? (
              <Loader2Icon size={24} className="animate-spin mr-8" />
            ) : session.status === "authenticated" ? (
              <>
                <Link href={"/dashboard"}>
                  <Button variant={"ghost"} className="w-full">
                    <LayoutDashboardIcon size={24} className="mr-2" />
                    Gösterge Paneli
                  </Button>
                </Link>
                <Separator />
                <h2 className="text-lg font-semibold text-center">Hesabım</h2>
                <Link href={"/settings"}>
                  <Button variant={"ghost"} className="w-full">
                    <LockIcon size={24} className="mr-2" />
                    Güvenlik Ayarları
                  </Button>
                </Link>
                <Button
                  variant={"ghost"}
                  className="w-full"
                  onClick={() => signOut()}
                >
                  <LogOutIcon size={24} className="mr-2" />
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <Link href={"/register"}>
                  <Button variant={"ghost"} className="w-full">
                    <UserPlus2Icon size={24} className="mr-2" />
                    Kayıt Ol
                  </Button>
                </Link>
                <Link href={"/login"}>
                  <Button variant={"ghost"} className="w-full">
                    <LockIcon size={24} className="mr-2" />
                    Giriş Yap
                  </Button>
                </Link>
              </>
            )}
            <Separator />
            <h2 className="text-lg font-semibold text-center">Tema</h2>
            <ToggleTheme className="w-full" />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
