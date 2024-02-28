import Image from "next/image";
import React from "react";
import imageDilruba from "@/images/dilruba-sonmez.png";
import imageTimothy from "@/images/timothy-r-jordan.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { dilrubaEmail } from "@/config/contactInfos";

const AboutPage = () => {
  return (
    <div className="grid grid-cols-2 gap-5 py-5 px-10 md:px-[5%] lg:px-[15%]">
      <section className="bg-white p-4 shadow-md rounded-md w-full col-span-2">
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
          adresinden ulaşabilirsiniz.
        </p>
      </section>

      <section className="flex flex-col ic gap-4 bg-white p-4 shadow-md rounded-md w-full col-span-2 sm:col-span-1">
        <Image
          alt="Dilruba Sönmez"
          src={imageDilruba}
          className="w-full md:w-60 self-center aspect-square object-cover rounded-full"
        />
        <h2 className="font-semibold text-center text-2xl">Dilruba Sönmez</h2>
        <h3>Eğitim:</h3>
        <ul>
          <li className="shadow p-3 rounded-md space-y-1">
            <div>
              <span className="font-semibold">İbn Haldun Üniversitesi</span>
              <span className="text-sm">, Yüksek Lisans ve Doktora</span>
            </div>
            <div className="flex justify-between">
              <span>Klinik Psikoloji</span>
              <span className="font-semibold">Türkiye</span>
            </div>
            <Separator />
            <div>
              <b>Yüksek Lisans</b>: 2018-2020
            </div>
            <div>
              <b>Doktora</b>: 2020-Devam
            </div>
          </li>
          <li className="shadow p-3 rounded-md space-y-1">
            <div>
              <span className="font-semibold">İstanbul Şehir Üniversitesi</span>
              <span className="text-sm">, Lisans</span>
            </div>
            <div className="flex justify-between">
              <span>Psikoloji (İngilizce)</span>
              <span className="font-semibold">Türkiye</span>
            </div>
          </li>
        </ul>
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

      <section className="flex flex-col ic gap-4 bg-white p-4 shadow-md rounded-md w-full col-span-2 sm:col-span-1">
        <Image
          alt="Profesör Dr. Timothy Richard Jordan"
          src={imageTimothy}
          className="w-full md:w-60 self-center aspect-square object-cover rounded-full"
        />
        <h2 className="font-semibold text-center text-2xl">
          Profesör Dr. Timothy Richard Jordan
        </h2>
        <h3>Eğitim:</h3>
        <ul>
          <li className="shadow p-3 rounded-md space-y-1">
            <div>
              <span className="font-semibold">The University of Reading</span>
              <span className="text-sm">, Doktora</span>
            </div>
            <div className="flex justify-between">
              <span>Psychology/Cognitive Psychology</span>
              <span className="font-semibold">İngiltere</span>
            </div>
            <Separator />
            <div>
              <b>Doktora</b>: 1981-1985
            </div>
          </li>
          <li className="shadow p-3 rounded-md space-y-1">
            <div>
              <span className="font-semibold">The University of Reading</span>
              <span className="text-sm">, Lisans</span>
            </div>
            <div className="flex justify-between">
              <span>Psychology</span>
              <span className="font-semibold">İngiltere</span>
            </div>
            <Separator />
            <div>
              <b>Lisans</b>: 1978-1981
            </div>
          </li>
        </ul>
        <Button asChild variant={"link"} className="underline">
          <Link href="https://scholar.google.ae/citations?user=_iw29XQAAAAJ&hl=en">
            Akademik Çalışmalar
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default AboutPage;
