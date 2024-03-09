"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`;
};

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center lg:grid grid-cols-3 py-4 px-5 sm:px-[10%] bg-primary text-primary-foreground">
      <Link href="/" className="flex gap-4">
        <Image
          loader={imageLoader}
          src={"brain-logo.png"}
          alt="MindZone"
          width={50}
          height={50}
        />

        <div>
          <h1 className="text-2xl font-semibold col-span-1">MindZone</h1>
          <small className="text-xs opacity-70">
            Ruh Sağlığına Yönelik Beyin Egzersizleri
          </small>
        </div>
      </Link>

      <div className="hidden lg:flex items-center justify-center gap-1 col-span-1">
        <Link href={"/"}>
          <Button variant={"ghost"}>Ana Sayfa</Button>
        </Link>
        <Link href={"/about"}>
          <Button variant={"ghost"}>Hakkımızda</Button>
        </Link>
        <Link href={"/contact"}>
          <Button variant={"ghost"}>İletişim</Button>
        </Link>
      </div>

      <div className="hidden md:flex justify-end items-center gap-1 col-span-1 flex-1">
        <Link href={"/register"}>
          <Button variant={"ghost"}>Kayıt Ol</Button>
        </Link>
        <Link href={"/login"}>
          <Button variant={"ghost"}>Giriş Yap</Button>
        </Link>
        {/* TODO: <LanguageSelector />  */}
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
            className="w-[200px] sm:w-[500px] flex flex-col"
          >
            <h1 className="text-2xl font-semibold text-center mt-5">
              MindZone
            </h1>
            <Link href={"/"}>
              <Button variant={"ghost"} className="w-full">
                Ana Sayfa
              </Button>
            </Link>
            <Separator />
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
            <Separator />
            <Link href={"/about"}>
              <Button variant={"ghost"} className="w-full">
                Hakkımızda
              </Button>
            </Link>
            <Link href={"/contact"}>
              <Button variant={"ghost"} className="w-full">
                İletişim
              </Button>
            </Link>
            {/* TODO: <LanguageSelector /> */}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
