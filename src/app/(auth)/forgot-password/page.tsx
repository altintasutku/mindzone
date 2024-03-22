import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import React from "react";

const ForgotPassword = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <div className="flex gap-2 items-end">
        <h1 className="text-2xl bg-gradient-to-r from-primary to-blue-400 text-transparent bg-clip-text">
          MindZone /
        </h1>{" "}
        <span className="font-light opacity-70">Şifremi Unuttum</span>
      </div>
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
