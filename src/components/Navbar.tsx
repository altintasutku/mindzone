import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import LanguageSelector from "./LanguageSelector";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center sm:grid grid-cols-3 py-4 px-5 sm:px-[10%] bg-primary text-primary-foreground">
      <Link href="/">
        <h1 className="text-2xl font-semibold col-span-1">MindZone</h1>
        <small className="text-xs opacity-70">
          Ruh Sağlığına Yönelik Beyin Egzersizleri
        </small>
      </Link>

      <div className="hidden sm:flex items-center justify-center gap-1 col-span-1">
        <Link href={"/about"}>
          <Button variant={"ghost"}>Hakkımızda</Button>
        </Link>
        <Link href={"/contact"}>
          <Button variant={"ghost"}>İletişim</Button>
        </Link>
      </div>

      <div className="hidden sm:flex justify-end items-center gap-1 col-span-1">
        <Link href={"/register"}>
          <Button variant={"ghost"}>Kayıt Ol</Button>
        </Link>
        <Link href={"/login"}>
          <Button variant={"ghost"}>Giriş Yap</Button>
        </Link>
        <LanguageSelector />
      </div>

      <div className="flex sm:hidden items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"}>
              <MenuIcon size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side={"right"} className="w-[200px] flex flex-col">
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
            <LanguageSelector />
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
