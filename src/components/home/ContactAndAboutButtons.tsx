"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

const ContactAndAboutButtons = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.7 }}
      className="grid grid-cols-2 justify-center text-center bg-white p-4 shadow-md rounded-md w-full bg-opacity-30"
    >
      <small className="text-sm text-center opacity-65">
        Daha fazla bilgi almak için bize ulaşın
      </small>
      <small className="text-sm text-center opacity-65">
        ya da hakkımızda daha fazla bilgi edinin
      </small>
      <Button asChild variant={"link"} className="underline">
        <Link href="/contact">İletişim</Link>
      </Button>
      <Button asChild variant={"link"} className="underline">
        <Link href="/about">Hakkında</Link>
      </Button>
    </motion.section>
  );
};

export default ContactAndAboutButtons;
