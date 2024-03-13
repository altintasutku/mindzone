import React from "react";

const IntroductionDS = () => {
  return (
    <>
      <p>
        <h2 className="text-xl font-semibold text-center">
          1. egzersiz açıklaması
        </h2>
        Bu egzersizde ekranda gördüğünüz sayıları{" "}
        <strong>ezberlemeye çalışacaksınız.</strong>
        <br />
        Tüm sayılar 0 ile 9 arasındadır.
        <br />
        Bu tür sayılara rakam diyoruz.
        <br />
        Birbiri ardına bir dizi rakam göreceksiniz.
        <br />
        Rakamları hatırladıktan sonra sizlerden o rakamları{" "}
        <strong>sırayla</strong> yazmanızı isteyeceğiz.
      </p>
      <ul className="list-disc my-2">
        <li>Ör. 1 – 2- 3- 4 = 1234 yazmanız gerekmektedir.,</li>
      </ul>
      <p>
        Tüm sayıları girdikten sonra “Devam” butonuna tıklayarak sonraki adıma
        geçeceksiniz.
        <br />
        Rakamları girdikten sonra yanıtınızın doğru olup olmadığı söylenecektir.
        <br />
        Hadi başlayalım!
      </p>
    </>
  );
};

export default IntroductionDS;
