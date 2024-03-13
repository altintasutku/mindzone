"use client";

import Image from "next/image";
import React from "react";

const loader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/test_four_images/${src}.png`;
};

const IntroductionTestFour = () => {
  return (
    <>
      <p>
        Ekranda bazı insan fotoğrafları göreceksiniz. Fotoğrafı gördükten sonra
        “sizlerin nasıl hissettiğinizi” puanlamanızı istiyoruz. Bu puanlamayı
        aşağıdaki 9 küçük şekilli seçenekler üzerinden yapmanız gerekmektedir.
        Bu küçük insan şekilleri olumsuz hissetmekten olumlu hissetmeye doğru
        puanlamayı işaret etmektedir. (1) çok olumsuz (5) nötr ve (9) çok olumlu
        seçeneklerini ifade etmektedir.
      </p>
      <Image
        loader={loader}
        src={`intro`}
        alt="introductionOptions"
        height={100}
        width={500}
      />
    </>
  );
};

export default IntroductionTestFour;
