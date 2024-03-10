import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <section className="flex flex-col gap-4 bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full">
      <small className="text-sm text-center opacity-65">
        Devam etmek için sisteme kayıt ol ya da giriş yap
      </small>
      <div className="flex justify-center items-center gap-5">
        <Button asChild>
          <Link className="text-white" href={"/register"}>Kayıt Ol</Link>
        </Button>
        <p>ya da</p>
        <Button asChild variant={"outline"}>
          <Link href={"/login"}>Giriş Yap</Link>
        </Button>
      </div>
    </section>
  );
};

export default AuthButtons;
