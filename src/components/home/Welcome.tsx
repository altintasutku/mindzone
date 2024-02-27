import React from 'react'

const Welcome = () => {
  return (
    <section className="bg-white p-4 shadow-md rounded-md w-full">
        {/* TODO: yazilar degisebilir cok uzun ve okumak sıkıcı gelebilir */}
        <h2 className="font-semibold text-xl">Hoş Geldin!</h2>
        <p>
          Sizler için ruh sağlığına yönelik hazırladığımız{" "}
          <span className="font-bold">online ve ücretsiz</span> egzersiz
          programımıza hoş geldiniz.
          <br />
          Amacımız kaygı, stres ve depresyon gibi ruh sağlığı problemlerine
          hızlı ve eğlenceli çözüm yolları üretmektedir. Bu amaç doğrultusunda
          sizlerden birkaç hafta tasarladığımız egzersizleri deneyimlemeniz
          beklenmektedir.
          <br />
          Egzersizleri tamamladığınız da{" "}
          <span className="font-bold">
            200 TL, 300 TL, 400 TL ve 500 TL’lik hediye
          </span>{" "}
          çekleri kazanma fırsatınız olacaktır. Bu çekleri istediğiniz şekilde
          kullanmanız için sizlere ulaştırılacaktır.
          <br />
          Uygulamalar 6 hafta sürmesi beklenirken her egzersiz 10-15 dakikalık
          çalışmalardan oluşmaktadır ve dilediğiniz saat ve günde haftalık
          egzersizleri deneyimleyeme hakkına sahip olacaksınız.
          <br />
          Bizlerle ilgili bilgilere ulaşmak ve iletişime geçmek için &quot;Biz
          kimiz&quot; kısmına tıklayabilirsiniz.
        </p>
      </section>
  )
}

export default Welcome