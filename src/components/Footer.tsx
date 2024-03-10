import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-5 py-5 px-10 md:px-[10%] lg:px-[25%]">
      <div className="bg-white dark:bg-zinc-900 p-4 shadow-md rounded-md w-full">
        <p className="text-center text-sm opacity-65">
          © 2024 MindZone. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
