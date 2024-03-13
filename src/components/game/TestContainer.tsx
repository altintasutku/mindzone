// "use client";

// import { usePathname, useRouter } from "next/navigation";
import React from "react";
// import { Separator } from "../ui/separator";
// import { Button } from "../ui/button";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const TestContainer = ({ children }: Props) => {
  // const pathname = usePathname();
  // const router = useRouter();

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white dark:bg-zinc-900 m-5 p-4 rounded-md shadow w-full md:max-w-[80%]">
        {children}
        {/* <Separator className="my-4" />
        <h2 className="text-center my-4 font-semibold">Performans Testleri</h2>
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
