"use client";

import Image from "next/image";
import React from "react";

const loader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/test_four_images/${src}.png`;
};

const IntroductionTestFive = () => {
  return (
    <>
      <h2 className="text-xl font-semibold text-center">
        5. performans testi açıklaması
      </h2>
      <p>
        Ekranda “Göz” resimleri gösterilecektir. Resimdeki kişinin ne
        düşündüğünü ya da hissettiğini en iyi tanımlayan kelimeyi işaretlemeniz
        gerekmektedir. Birden fazla seçenek doğru gibi gelse de “sadece bir
        tane” ve en yakın olduğunu düşündüğünüz cevabı işaretleyiniz. İlk önce
        bir tane denemeyle başlayalım!
      </p>
    </>
  );
};

export default IntroductionTestFive;
