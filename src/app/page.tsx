import AuthButtons from "@/components/home/AuthButtons";
import ContactAndAboutButtons from "@/components/home/ContactAndAboutButtons";
import Welcome from "@/components/home/Welcome";
import WhatIs from "@/components/home/WhatIs";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";

async function Home({
  searchParams,
}: {
  searchParams: { nav: string | undefined };
}) {
  const session = await getAuthSession();

  if (session && searchParams.nav !== "true") {
    redirect("/dashboard");
  }
  

  return (
    <main className="flex flex-col items-center gap-5 py-5 px-3 md:px-[10%] lg:px-[25%]">
      <Welcome />

      <WhatIs />

      <AuthButtons />

      <ContactAndAboutButtons />
    </main>
  );
}

export default Home;
