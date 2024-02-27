import React from "react";

const ContactPage = () => {
  return (
    <div className="bg-white shadow m-[10%] p-4 rounded-md">
      <h1 className="font-semibold text-xl">İletişim</h1>
      <p>Bizlere soru sormakta kendinizi özgür hissedin</p>
      <h2 className="font-semibold">Araştırmacılar:</h2>
      <span>
        Herhangi bir sorunuzda araştırmacıya{" "}
        <a
          className="text-blue-600 underline"
          href="mailto:dilruba.sonmez@stu.ihu.edu.tr"
        >
          dilruba.sonmez@stu.ihu.edu.tr
        </a>{" "}
        adresinden ulaşabilirsiniz.
      </span>
      <h2 className="font-semibold">Geliştiricler:</h2>
      <span>
        Herhangi teknik bir hata veya öneri için{" "}
        <a
          className="text-blue-600 underline"
          href="mailto:altintasutku@gmail.com"
        >
          altintasutku@gmail.com
        </a>{" "}
        adresi ile iletişime geçiniz.
      </span>
    </div>
  );
};

export default ContactPage;
