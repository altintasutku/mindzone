import React from "react";

const IntroductionsTestTwo = () => {
  return (
    <ul className='list-disc mx-2'>
      <li>
        Bu görevde, art arda harfler göreceksiniz. Her harf birkaç saniye
        boyunca gösterilir. Aynı harfi 2 harf önce görüp görmediğinize karar
        vermeniz gerekir. Buna n-2-geri görevi denir. Aynı harfi 2 harf önce
        gördüyseniz, X butonuna basarsınız. Eğer doğru yaptıysanız, harfin
        etrafında yeşil renk yandığını görürsünüz. Eğer tuşa basmamanız
        gerekirken basarsanız, harfin etrafında kırmızı renk görürsünüz.
      </li>
      <li>
        İlk önce deneme oyununa başlayacaksınız. Deneme oyununa başlamak için
        sağ oka tıklayın.
      </li>
      <li>Deneme oyunu bitti. Asıl oyuna başlamak için “başla” tıklayın.</li>
    </ul>
  );
};

export default IntroductionsTestTwo;
