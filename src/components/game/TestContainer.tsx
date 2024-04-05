import React from "react";
import { Separator } from "@/components/ui/separator";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const TestContainer = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 m-5 p-4 rounded-md shadow w-full md:max-w-[80%]">
        {children}
        <Separator className="my-4" />
        <div
          className={
            "text-slate-400 dark:text-slate-600 p-4 border border-slate-400 dark:border-slate-600 rounded-md text-sm"
          }
        >
          <b>Dikkat!</b> İlk 5 oyun performans oyunudur ve oyundan çıkıp tekrar
          girmeniz oyunu sıfırlayacaktır oyunlar ortalama 8-10 dakika sürmekte.
          Lütfen &quot;Başla&quot; dedikten sonra performans oyunları kapatmadan
          bitiriniz. Her oyun arasında istediğiniz kadar mola verebilirsiniz.
        </div>
        {/* <h2 className="text-center my-4 font-semibold">Performans Testleri</h2>
        <div className="flex gap-3 flex-wrap justify-center">
          <Button
            onClick={() =>
              router.push((parseInt(pathname.split("/")[2]) - 1).toString())
            }
            disabled={pathname === "/test/1"}
          >
            Önceki Oyun
          </Button>
          <Button
            onClick={() =>
              router.push((parseInt(pathname.split("/")[2]) + 1).toString())
            }
            disabled={pathname === "/test/5"}
          >
            Sonraki Oyun
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default TestContainer;
