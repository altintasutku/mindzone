import { dilrubaEmail } from "@/assets/contactInfos";
import React from "react";

const WhatIs = () => {
  return (
    <section className="bg-white p-4 shadow-md rounded-md w-full">
      <p>
        Bu çalışma Uzm. Klinik Psikolog Dilruba Sönmez’in doktora programı
        kapsamında tasarladığı bir web sitedir. Prof. Dr. Timothy Jordan
        tarafından danışmanlık verilmektedir. Bu web sitesindeki uygulamaları
        denemek ve devamlılık sağlamada gönüllülük esastır ve sizler için
        herhangi bir risk bulunmamaktadır. Herhangi bir sorunuzda araştırmacıya{" "}
        <a className="text-blue-600 underline" href={`mailto:${dilrubaEmail}`}>
          {dilrubaEmail}
        </a>{" "}
        adresinden ulaşabilirsiniz.
      </p>
    </section>
  );
};

export default WhatIs;
