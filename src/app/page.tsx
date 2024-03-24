import AuthButtons from "@/components/home/AuthButtons";
import ContactAndAboutButtons from "@/components/home/ContactAndAboutButtons";
import Welcome from "@/components/home/Welcome";
import {getAuthSession} from "@/lib/auth";
import {redirect} from "next/navigation";

type Props = Readonly<{
  searchParams: { nav: string | undefined };
}>;

async function Home({ searchParams }: Props) {
  const session = await getAuthSession();

  if (session && searchParams.nav !== "true") {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center gap-5 py-5 px-3 md:px-[10%] lg:px-[25%]">
      <Welcome />

      <AuthButtons />

      <ContactAndAboutButtons />
    </main>
  );
}

export default Home;
