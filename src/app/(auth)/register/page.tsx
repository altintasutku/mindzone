import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div className="flex gap-2 items-end">
        <h1 className="text-2xl bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text">
          MindZone /
        </h1>{" "}
        <span className="font-light opacity-70">Kayıt Ol</span>
      </div>
      <RegisterForm />
      <div>
        Zaten bir hesabınız var mı?{" "}
        <Link href="/login" className="text-primary">
          Giriş Yap
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
