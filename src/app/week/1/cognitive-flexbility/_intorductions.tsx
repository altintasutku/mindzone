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
    </>
  );
};

export default IntroductionCF;
