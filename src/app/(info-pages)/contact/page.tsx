import {
  dilrubaEmail,
} from "@/config/contactInfos";
import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 shadow m-[10%] p-4 rounded-md">
      <h1 className="font-semibold text-xl">İletişim</h1>
      <p>Bizlere soru sormakta kendinizi özgür hissedin</p>
      <h2 className="font-semibold">Araştırmacılar:</h2>
      <span>
        Herhangi bir sorunuzda araştırmacıya{" "}
        <a className="text-blue-600 underline" href={`mailto:${dilrubaEmail}`}>
          {dilrubaEmail}
        </a>{" "}
        adresinden ulaşabilirsiniz.
      </span>
    </div>
  );
};

export default ContactPage;
