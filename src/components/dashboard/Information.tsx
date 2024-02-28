import React from "react";
import { Separator } from "../ui/separator";

const Information = () => {
  return (
    <section className="bg-white shadow p-4 text-center">
      <h1 className="font-semibold text-xl">Gösterge Paneli</h1>
      <p>
        Gösterge panelinden ilerlemeni izleyebilir ve yeni testlere girebilirsin
      </p>
      <Separator className="my-4" />
      <h1 className="font-semibold text-xl">Sıralama</h1>
      <p>
        Anket 1 -&gt; Performans Görevleri -&gt; Anket 2 -&gt; Haftalik Görev
      </p>
      <small className="opacity-70 text-red-500">
        Haftalık görevlere başlamadan önce birinci anketi bitirmelisiniz,
        sonrasında performans görevlerini ve ikinci anketi sırasıyla yapın.
      </small>
    </section>
  );
};

export default Information;
