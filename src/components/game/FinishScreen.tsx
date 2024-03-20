"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {
  url: string;
};

const FinishScreen = ({ url }: Props) => {
  const router = useRouter();

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
