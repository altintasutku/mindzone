import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

const ContactAndAboutButtons = () => {
  return (
    <section className="grid grid-cols-2 justify-center text-center bg-white p-4 shadow-md rounded-md w-full">
      <small className="text-sm text-center opacity-65">
        Daha fazla bilgi almak için bize ulaşın
      </small>
      <small className="text-sm text-center opacity-65">
        ya da hakkımızda daha fazla bilgi edinin
      </small>
      <Button asChild variant={"link"} className="underline">
        <Link href="/contact">İletişim</Link>
      </Button>
      <Button asChild variant={"link"} className="underline">
        <Link href="/about">Hakkında</Link>
      </Button>
    </section>
  );
};

export default ContactAndAboutButtons;
