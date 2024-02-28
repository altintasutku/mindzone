import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  url: string;
};

const FinishScreen = ({url}:Props) => {
  return (
    <div>
      <p>
        <strong>Tebrikler!</strong> Egzersizi tamamladınız.
        <br />
        Bir sonraki egzersize geçebilirsiniz.
      </p>
      <Button asChild className="my-3">
        <Link href={url}>Sonraki Egzersize Geç</Link>
      </Button>
    </div>
  );
};

export default FinishScreen;
