"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { dilrubaEmail } from "@/config/contactInfos";

const imageLoader = ({ src }: { src: string }) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_URL}/${src}`;
};

const AboutPage = () => {
  return (
    <div className="grid grid-cols-2 gap-5 py-5 px-10 md:px-[5%] lg:px-[15%]">
      <section className="bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full col-span-2">
        <h2 className="font-semibold text-xl text-primary">Biz Kimiz?</h2>
        <p>
          Bu çalışma Uzm. Klinik Psikolog Dilruba Sönmez’in doktora programı
          kapsamında tasarladığı bir web sitedir. Prof. Dr. Timothy Jordan
          tarafından danışmanlık verilmektedir. Bu web sitesindeki uygulamaları
          denemek ve devamlılık sağlamada gönüllülük esastır ve sizler için
          herhangi bir risk bulunmamaktadır. Herhangi bir sorunuzda
          araştırmacıya{" "}
          <a
            className="text-blue-600 underline"
            href={`mailto:${dilrubaEmail}`}
          >
            {dilrubaEmail}
          </a>{" "}
          adresinden ulaşabilirsiniz
        </p>
      </section>

      <section className="flex flex-col ic gap-4 bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full col-span-2 sm:col-span-1">
        <Image
          loader={imageLoader}
          alt="Dilruba Sönmez"
          src={"dilruba-sonmez.png"}
          width={240}
          height={240}
          className="w-full md:w-60 self-center aspect-square object-cover rounded-full"
        />
        <h2 className="font-semibold text-center text-2xl">Dilruba Sönmez</h2>
        <Separator />
        <p>
          Dilruba Sönmez, İstanbul Şehir Üniversitesi Psikoloji bölümünden
          yüksek onur derecesiyle mezun olmuştur. Ardından tam burslu olarak İbn
          Haldun Üniversitesi – Klinik Psikoloji alanında yüksek lisansını
          “Otizmli ergenlerde sosyal kaygının bilişsel ve duygusal empati ile
          ilişkisi” tezi ile Profesör Timothy R. Jordan süpervizörlüğünde
          tamamlamıştır ve çalışması International Journal of Developmental
          Disabilities dergisinde yayınlanmıştır. Halen İbn Haldun
          Üniversitesinde – Doktora eğitimine Profesör Timothy Jordan
          süpervizörlüğünde devam etmektedir ve tez aşamasındadır. Ayrıca şu an
          Medipol Üniversitesi’nde klinik psikolog olarak görev yapmakta ve İbn
          Haldun Üniversitesi Psikoterapi Uygulama ve Araştırma Merkezi’nde
          klinik psikolog olarak ergen ve yetişkin alanında danışanlarını kabul
          etmektedir.
        </p>
        <Button asChild variant={"link"} className="underline">
          <Link href="https://scholar.google.com/citations?user=92I4Dw8AAAAJ&hl=tr">
            Akademik Çalışmalar
          </Link>
        </Button>
      </section>

      <section className="flex flex-col ic gap-4 bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full col-span-2 sm:col-span-1">
        <Image
          loader={imageLoader}
          alt="Profesör Dr. Timothy Richard Jordan"
          src={"timothy-r-jordan.png"}
          width={240}
          height={240}
          className="w-full md:w-60 self-center aspect-square object-cover rounded-full"
        />
        <h2 className="font-semibold text-center text-2xl">
          Profesör Dr. Timothy Richard Jordan
        </h2>
        <Separator />
        <p>
          Profesör Dr. Tim Jordan, İngiltere&apos;deki Reading
          Üniversitesi&apos;nden Psikoloji alanında yüksek onur derecesi ile
          mezun olduktan sonra Psikoloji alanında doktora derecesi almıştır.
          Daha sonra Birleşik Krallık&apos;taki St Andrews Üniversitesi&apos;nde
          ilk fakülte pozisyonuna geçmiş ve Akdeniz ve Orta Doğu&apos;da aynı
          akademik pozisyonlara geçmeden önce Birleşik Krallık&apos;ta
          Nottingham ve Leicester Üniversitelerinde Profesörlük Kürsüleri
          almıştır. Şu anda İstanbul İbn Haldun Üniversitesi&apos;nde Biliş ve
          Bilişsel Sinirbilim Profesörü olarak görev yapmaktadır. Prof.
          Jordan&apos;ın araştırma alanları çok geniştir ve görsel algı, yazılı
          ve sözlü dil tanıma, yüz işleme ve hemisferik uzmanlaşma gibi temel
          alanları içerir ve bu bilgileri genellikle farklı kültürler,
          cinsiyetler ve toplumlar arasında bilişsel ve algısal süreçleri
          incelemek için uygular. İbn Haldun Üniversitesi&apos;nde Biliş ve Algı
          Laboratuvarlarını kurmuştur ve yönetmektedir.
        </p>
        <Button asChild variant={"link"} className="underline">
          <Link href="https://scholar.google.ae/citations?user=_iw29XQAAAAJ&hl=en">
            Akademik Çalışmalar
          </Link>
        </Button>
      </section>

      <h2 className="col-span-2 text-center font-bold text-xl">Proje Asistanları</h2>

      <section className="flex flex-col ic gap-4 bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full col-span-2 sm:col-span-1">
        <Image
          loader={imageLoader}
          alt="Esmahan Banu Yıldız"
          src={"esmahan-banu-yildiz.png"}
          width={240}
          height={240}
          className="w-full md:w-60 self-center aspect-square object-cover rounded-full"
        />
        <h2 className="font-semibold text-center text-2xl">
          Esmahan Banu Yıldız
        </h2>
        <Separator />
        <p>
          İstanbul Bilgi Üniversitesi&apos;nde Psikoloji 4.sınıf öğrencisi olan
          Esmahan Banu Yıldız klinik psikoloji alanına ilgi duymaktadır ve daha
          önce Asst. Prof. Dr. Beyza Ateş tarafından yürütülen KULE projesinde
          ve Prof. Dr. Sibel Halfon tarafından yürütülen Psikoterapi Araştırma
          Laboratuvarı&apos;nda araştırma asistanlığı yapmıştır. Şu anda Uzm. Klinik
          Psikolog Dilruba Sönmez tarafından yürütülen MindZone projesinde
          asistanlık yapmaktadır.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
