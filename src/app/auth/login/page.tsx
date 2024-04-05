"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Satisfy } from "next/font/google";
import BoxInput from "@/components/BoxInput";
import ButtonAuth from "@/components/ButtonAuth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/features/auth/useUserSession";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
});

const LoginPage = () => {
  const { push } = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = process.env.CALLBACK_URL_GOOGLE;
  
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: "/",
      });

      if (!res?.error) {
        push("/");
      } else {
        console.log(res.error);
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  
  const {url} = useUserSession()
  const handleLoginGoogle = async () => {
    await signIn("google", { redirect: false });
    // if(url === '/auth/phone'){
    //   push('/auth/phone')
    // }
  };

  return (
    <div className="min-h-screen md:px-72 flex flex-col items-center justify-center w-screen">
      <h1 className={`${satisfy.className} text-3xl text-primary`}>
        Nustaravel
      </h1>
      <p className="text-miniText mt-2 mb-5">Silahkah Login dengan akun anda</p>
      <form action="" onSubmit={(e) => handleLogin(e)} className="w-full">
        <BoxInput
          id={"email"}
          label={"Email"}
          type={"email"}
          placeHolder={"Email Anda"}
        />
        <BoxInput
          id={"password"}
          label={"Password"}
          type={"password"}
          placeHolder={"Minimal 8 karakter"}
        />

        <div className="w-full px-8 mt-4">
          <ButtonAuth
            label={isLoading ? "Loading..." : "Log In"}
            disabled={isLoading}
          />
        </div>
      </form>
      <div className="flex w-[80%] py-5 text-xs items-center text-miniText">
        <div className="flex-grow border-b border-gray-300"></div>
        <span className="px-4">Atau gunakan akun</span>
        <div className="flex-grow border-b border-gray-300"></div>
      </div>

      <div className="flex w-[50%] py-1 text-xs items-center text-miniText justify-between">
        <div className="p-3 rounded-lg border border-miniText">
          <img src="/icons/apple-logo.png" className="w-6 h-6" />
        </div>
        <button onClick={handleLoginGoogle} className="p-3 rounded-lg border border-miniText">
          <img src="/icons/search.png" className="w-6 h-6" />
        </button>
        <div className="p-3 rounded-lg border border-miniText">
          <img src="/icons/facebook.png" className="w-6 h-6" />
        </div>
      </div>

      <span className="w-[80%] py-2 mt-4 text-xs text-center text-miniText">
        Dengan membuat akun kamu menyetujui{" "}
        <span className="text-primary">Syarat & Ketentuan</span> dan{" "}
        <span className="text-primary">Kebijakan Privasi</span> Nustaravel.
      </span>

      <div className="absolute bottom-0 py-3 items-center">
        <span className="">
          Belum punya akun?{" "}
          <Link
            href={"/auth/daftar"}
            className="font-semibold text-primary cursor-pointer"
          >
            Buat Akun yuk!
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
