import PerformanceTasks from "@/components/dashboard/PerformanceTasks";
import Questions from "@/components/dashboard/Questions";
import WeeklyTasks from "@/components/dashboard/WeeklyTasks";
import { Separator } from "@/components/ui/separator";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="flex flex-col px-5 sm:px-16 lg:px-32 py-3 sm:py-10 gap-4">
      <section className="bg-white shadow p-4 text-center">
        <h1 className="font-semibold text-xl">Gösterge Paneli</h1>
        <p>
          Gösterge panelinden ilerlemeni izleyebilir ve yeni testlere
          girebilirsin
        </p>
        <Separator className="my-4"/>
        <h1 className="font-semibold text-xl">Sıralama</h1>
        <p>
          Anket 1 -&gt; Performans Görevleri -&gt; Anket 2 -&gt; Haftalik Görev
        </p>
        <small className="opacity-70 text-red-500">
          Haftalık görevlere başlamadan önce birinci anketi bitirmelisiniz,
          sonrasında performans görevlerini ve anket ikiyi sırasıyla yapın.
        </small>
      </section>

      <Questions />

      <PerformanceTasks />

      <WeeklyTasks />
    </div>
  );
};

export default DashboardPage;
