import React from "react";

const IntroductionInh = () => {
  return (
    <>
      <p>
        Şimdi size bazı kelimeler göstereceğiz.  &apos;Başlayın&apos; dedikten
        hemen sonra, sizden, bu kartlarda yazılı olan kelimelerin hangi renkte
        yazıldığını aşağıdaki butona bakarak olabildiğince hızlı yanıtlamanız
        gerekmektedir.
        <br />
        Renk ve kelimeler uyumsuz olduğunda cevap vermek zor olabilir, o yüzden
        odaklanarak dikkatli ve hızlı yanıtlamaya çalışın.
        <br />
      </p>
      <ul>
        <li className="text-yellow-400">
          YEŞİL - (sarı)’ya tıklamanız gerekmektedir.
        </li>
        <li className="text-green-400">
          MAVİ – (yeşil)’e tıkmalamanız gerekmektedir.
        </li>
        <li className="text-blue-400">
          KIRMIZI – Maviye tıklamanız gerekmektedir.{" "}
        </li>
        <li className="text-red-400">
          SARI - (kırmızıya) tıklamanız gerekmektedir.{" "}
        </li>
        <li className="text-pink-400">
          MOR – pembe ye tıklaması gerekmektedir.
        </li>
        <li className="text-orange-400">
          PEMBE - turuncuya tıklaması gerekmektedir
        </li>
      </ul>
    </>
  );
};

export default IntroductionInh;
