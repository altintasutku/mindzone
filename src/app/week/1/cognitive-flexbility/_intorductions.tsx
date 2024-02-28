import React from "react";

const IntroductionCF = () => {
  return (
    <>
      <p>
        Bu egzersizde ekranda harfler ve sayılar göreceksiniz. Takip etmeniz
        gereken birkaç kural belirledik ve bunlara göre yanıtlamanız
        gerekmektedir.
        <br />
        4’e bölünmüş ekran göreceksiniz.
        <br />
        Bu ekranda <strong>harflerin yukarıda</strong> olması,{" "}
        <strong>sayıların aşağıda</strong> olması gerekmektedir.
        <br />
        <strong>Sessiz harf ve tek sayı ise ise X</strong> butonuna basmanız
        gerekirken,
        <br />
        <strong>Sesli harf ve çift sayı ise Y</strong> butonuna basılması
        gerekmektedir.
      </p>
      <ul className="list-disc my-2">
        <li>
          Örn: G8 ekranda göründüğünde sol yukarıda ise X tuşuna basılacaktır.
          Sağ aşağıda görüldüyse bu sefer çift sayı 8 olduğu için ona
          odaklanılarak Y tuşuna basılacaktır.
        </li>
        <li>
          Ör: G8 sayısı üstte göründüyse harfe odaklanılacak ve X ye
          basılacaktır. Ama aşağıda görünürse çift sayı olduğu için Y
          basılacaktır.
        </li>
        <li>
          Tek harf örneği (15 Tane) ŞİMDİ DAHA İYİ ANLAMAK İÇİN SADECE HARFLERİ
          DENEYELİM. SESSİZ HARF İSE X, SESLİ HARF İSE Y’YE BASIN.
        </li>
        <li>
          Tek sayı örneği (15 Tane) ŞİMDİ DAHA İYİ ANLAMAK İÇİN SADECE SAYILARI
          DENEYELİM. TEK SAYI İSE X, ÇİFT SAYI İSE Y’YE BASIN.
        </li>
      </ul>
      <p>
        Şimdi ikisi birlikte tekrar kuralı hatırlayalım.
        <br />
        Bu ekranda <strong>harflerin yukarıda</strong> olması,
        <strong>sayıların aşağıda</strong> olması gerekmektedir.
        <br />
        <strong>Sessiz harf ve tek sayı ise ise X</strong> butonuna basmanız
        gerekirken,
        <br />
        <strong>Sesli harf ve çift sayı ise Y</strong> butonuna basılması
        gerekmektedir.
        <br />
        Örn: G8 ekranda göründüğünde sol yukarıda ise X tuşuna basılacaktır. Sağ
        aşağıda görüldüyse bu sefer çift sayı 8 olduğu için ona odaklanılarak Y
        tuşuna basılacaktır.
      </p>
    </>
  );
};

export default IntroductionCF;
