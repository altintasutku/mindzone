import { redirect } from "next/navigation";
import React from "react";

const Page = () => {
  redirect("/test/1");

  return <div>
    Sayfayı yenileyin
  </div>;
};

export default Page;
