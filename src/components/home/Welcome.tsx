import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { Kalam } from "next/font/google";
import { cn } from "@/lib/utils";

export const fontSans = Kalam({
  weight: "700",
  subsets: ["devanagari"],
});

const Welcome = () => {
  return (
    <section className="bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full">
      {/* TODO: yazilar degisebilir cok uzun ve okumak sıkıcı gelebilir */}
      <h2
        className={cn(
          "font-semibold text-4xl flex justify-center my-4",
          fontSans.className
        )}
      >
        <span className="bg-clip-text bg-primary text-transparent bg-gradient-to-r from-primary to-purple-800">
          MindZone&apos;a Hoşgeldiniz.
        </span>
      </h2>
      <div>
        <p>
          Sizler için ruh sağlığına yönelik hazırladığımız{" "}
          <span className="font-bold border border-slate-400 dark:border-slate-200 px-1 rounded-sm">
            online ve ücretsiz
          </span>{" "}
          egzersiz programımıza hoş geldiniz.
          <br />
          <br />
          Amacımız kaygı, stres ve depresyon gibi ruh sağlığı problemlerine
          hızlı ve eğlenceli çözüm yolları üretmektedir.
          <br />
          <br />
          Bu amaç doğrultusunda sizlerden birkaç hafta tasarladığımız
          egzersizleri deneyimlemeniz beklenmektedir.
          <br />
          <br />
          Egzersizleri tamamladığınızda aşağıdaki hediye çeklerini kazanma
          fırsatınız olacaktır!
        </p>
        <div className="font-bold">
          <InfiniteMovingCards
            speed="faster"
            pauseOnHover={false}
            items={[
              {
                name: "",
                quote: "200TL",
                title: "Hediye Çeki",
              },
              {
                name: "",
                quote: "300TL",
                title: "Hediye Çeki",
              },
              {
                name: "",
                quote: "400TL",
                title: "Hediye Çeki",
              },
              {
                name: "",
                quote: "500TL",
                title: "Hediye Çeki",
              },
            ]}
          />
        </div>{" "}
        <p>
          Araştırma hakkında bilgi edinmek ya da bizim hakkımızda merak
          ettikleriniz var ise “Hakkımızda ve İletişim” kısımından detaylı
          bilgiye ulaşabilirsiniz.
        </p>
      </div>
    </section>
  );
};

export default Welcome;
