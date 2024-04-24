import React from "react";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

type Props = {
  url: string;
  isSending: boolean;
};

const FinishScreen = ({ url, isSending }: Props) => {
  if (isSending) {
    return (
      <div>
        <p>Verileriniz gönderiliyor. Lütfen bekleyin</p>
        <Loader2Icon size={24} className="animate-spin mx-auto" />
      </div>
    );
  }

  return (
    <div>
      <p>
        <strong>Tebrikler!</strong> Egzersizi tamamladınız.
        <br />
        Bir sonraki egzersize geçebilirsiniz.
      </p>
      <Link href={url}>
        <Button className="my-3">Sonraki Egzersize Geç</Button>
      </Link>
    </div>
  );
};

export default FinishScreen;
