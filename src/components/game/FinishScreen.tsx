"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

type Props = {
  url: string;
  isSending: boolean;
};

const FinishScreen = ({ url, isSending }: Props) => {
  const router = useRouter();

  if (isSending) {
    return <div>
      <p>Verileriniz gönderiliyor. Lütfen bekleyin</p>
      <Loader2Icon size={24} className="animate-spin mx-auto" />
    </div>;
  }

  return (
    <div>
      <p>
        <strong>Tebrikler!</strong> Egzersizi tamamladınız.
        <br />
        Bir sonraki egzersize geçebilirsiniz.
      </p>
      <Button onClick={() => router.push(url)} className="my-3">
        Sonraki Egzersize Geç
      </Button>
    </div>
  );
};

export default FinishScreen;
