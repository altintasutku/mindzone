import React from "react";

const IntroductionsTestTwo = () => {
  return (
    <>
      <h2 className="text-xl font-semibold text-center">
        2. performans testi açıklaması
      </h2>
      <ul className="list-disc mx-2">
        <li>
          Bu görevde, art arda harfler göreceksiniz. Her harf birkaç saniye
          boyunca gösterilir. Aynı harfi 2 harf önce görüp görmediğinize karar
          vermeniz gerekir. Buna n-2-geri görevi denir. Aynı harfi 2 harf önce
          gördüyseniz, X butonuna basarsınız. Eğer doğru yaptıysanız, harfin
          etrafında yeşil renk yandığını görürsünüz. Eğer tuşa basmamanız
          gerekirken basarsanız, harfin etrafında kırmızı renk görürsünüz.
        </li>
      </ul>
    </>
  );
};

export default IntroductionsTestTwo;
