import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const ContactAndAboutButtons = () => {
  return (
    <section className="flex justify-center text-center bg-white p-4 shadow-md rounded-md w-full">
      <div>
        <small className="text-sm text-center opacity-65">
          Daha fazla bilgi almak için bize ulaşın
        </small>
        <br />
        <Button asChild variant={"link"} className="underline">
          <Link href="/contact">İletişim</Link>
        </Button>
      </div>
      <div>
        <small className="text-sm text-center opacity-65">
          ya da hakkımızda daha fazla bilgi edinin
        </small>
        <br />
        <Button asChild variant={"link"} className="underline">
          <Link href="/about">Hakkında</Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactAndAboutButtons;
