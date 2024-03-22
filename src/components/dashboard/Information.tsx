import { InfoIcon } from "lucide-react";
import React from "react";

const Information = () => {
  return (
    <section className="bg-white dark:bg-zinc-900 shadow p-4 text-center rounded-md">
      <h1 className="font-semibold text-xl flex items-center justify-center">
        <InfoIcon size={24} className="inline-block mr-2" />
        Gösterge Paneli
      </h1>
      <p>
        Gösterge panelinden ilerlemeni izleyebilir ve yeni egzersizlere
        girebilirsin
      </p>
    </section>
  );
};

export default Information;
