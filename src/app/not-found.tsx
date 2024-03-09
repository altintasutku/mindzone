import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-80 text-white flex flex-col gap-5 justify-center items-center min-w-screen min-h-screen ">
      <h1 className="font-bold text-4xl">Bu sayfa bulunamadı!</h1>
      <p className="text-xl">
        Aradığınız sayfayı bulamadık. Lütfen tekrar deneyin.
      </p>
      <Link href="/">
        <Button variant={"link"} className="font-bold text-xl">Anasayfa</Button>
      </Link>
    </div>
  );
};

export default NotFound;
