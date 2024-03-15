import React from "react";

const IntroductionsTestOne = () => {
  return (
    <>
      <h2 className="text-xl font-semibold text-center">
        1. performans testi açıklaması
      </h2>
      <ul className="list-disc">
        <li>
          Bu egzersizde, ekranın alt kısmında size gösterilen bir kartı ekranın
          üst kısmında sunulan dört karttan biriyle eşleştirmeniz gerekir.
          Eşleştirme için kuralın ne olduğunu bulmanız gerekmektedir
        </li>
        <li>
          Aşağıdaki kartla eşleşen dört karttan birine tıklayın. Seçiminizi
          takip edin, geri bildirim alacaksınız. Eşleştirmeniz doğru değilse,
          farklı bir kural denemeniz gerekir.
        </li>
        <li>
          Örneğin: renge göre eşleştirirsebilirsiniz, şekle göre
          eşleştirebilirsiniz ya da sayıya göre eşleştirebilirsiniz.
        </li>
        <li>
          Ancak, hepsi bu kadar değil. Eşleştirme kuralı ara sıra değişir! Geri
          bildirimleri dikkatle izlemeniz gerekir. Eğer hata mesajları
          veriyorsa, kuralınızı değiştirmeniz gerekir!
        </li>
      </ul>
    </>
  );
};

export default IntroductionsTestOne;
