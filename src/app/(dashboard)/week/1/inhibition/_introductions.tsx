import React from "react";

const IntroductionInh = () => {
  return (
    <>
      <div>
        <h2 className="text-xl font-semibold text-center">
          3. egzersiz açıklaması
        </h2>
        <p>
          Şimdi size bazı kelimeler göstereceğiz. &apos;Başlayın&apos; dedikten
          hemen sonra, sizden, bu kartlarda yazılı olan kelimelerin hangi renkte
          yazıldığını aşağıdaki butona bakarak olabildiğince hızlı yanıtlamanız
          gerekmektedir.
          <br />
          Renk ve kelimeler uyumsuz olduğunda cevap vermek zor olabilir, o
          yüzden odaklanarak dikkatli ve hızlı yanıtlamaya çalışın.
        </p>{" "}
      </div>
      <br />
      <ul>
        <li className="text-yellow-400">
          YEŞİL - (sarı)’ya tıklamanız gerekmektedir.
        </li>
        <li className="text-green-400">
          MAVİ – (yeşil)’e tıklamanız gerekmektedir.
        </li>
      </ul>
    </>
  );
};

export default IntroductionInh;
