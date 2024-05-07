import AuthButtons from "@/components/home/AuthButtons";
import ContactAndAboutButtons from "@/components/home/ContactAndAboutButtons";
import Welcome from "@/components/home/Welcome";
import { getAuthSession } from "@/lib/auth";
import { MessageCircleWarningIcon } from "lucide-react";
import { redirect } from "next/navigation";

type Props = Readonly<{
  searchParams: { nav: string | undefined; status: string | undefined };
}>;

async function Home({ searchParams }: Props) {
  const session = await getAuthSession();

  if (session && searchParams.nav !== "true") {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center gap-5 py-5 px-3 md:px-[10%] lg:px-[25%]">
      {searchParams && searchParams.status === "week-finished" && (
        <div className="bg-primary flex items-center justify-center bg-opacity-40 text-white p-3 rounded-md gap-3">
          <MessageCircleWarningIcon />
          <span>
            Haftalık oyunları bitirdiniz tebrikler yeni anketler ve performans
            testleri yakında sizin için aktif olacak!
          </span>
        </div>
      )}

      <Welcome />

      <AuthButtons />

      <ContactAndAboutButtons />
    </main>
  );
}

export default Home;
