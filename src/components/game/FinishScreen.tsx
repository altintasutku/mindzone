import React from "react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  url: string;
};

const FinishScreen = ({ url }: Props) => {
  return (
    <div>
      <p>
        <strong>Tebrikler!</strong> Egzersizi tamamladınız.
        <br />
        Bir sonraki egzersize geçebilirsiniz.
      </p>
      <Link href={url} className={cn(buttonVariants(),"my-3")}>Sonraki Egzersize Geç</Link>
    </div>
  );
};

export default FinishScreen;
