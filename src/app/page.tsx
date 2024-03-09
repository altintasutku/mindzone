import AuthButtons from "@/components/home/AuthButtons";
import ContactAndAboutButtons from "@/components/home/ContactAndAboutButtons";
import Welcome from "@/components/home/Welcome";
import WhatIs from "@/components/home/WhatIs";

function Home() {
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
