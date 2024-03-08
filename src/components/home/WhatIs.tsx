"use client";

import { dilrubaEmail } from "@/config/contactInfos";
import React from "react";
import { motion } from "framer-motion";

const WhatIs = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay:0.3 }}
      className="bg-white p-4 shadow-md rounded-md w-full text-xs"
    >
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
    </motion.section>
  );
};

export default WhatIs;
