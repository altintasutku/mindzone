import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div className="flex gap-2 items-end">
        <h1 className="text-2xl bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text">
          MindZone /
        </h1>{" "}
        <span className="font-light opacity-70">Giriş Yap</span>
      </div>
      <LoginForm />
      <div>
        Şifrenizi mi unuttunuz?{" "}
        <Link href="/forgot-password" className="text-primary">
          Şifremi Sıfırla
        </Link>
      </div>
      <div>
        Henüz bir hesabınız yok mu?{" "}
        <Link href="/register" className="text-primary">
          Kayıt Ol
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
