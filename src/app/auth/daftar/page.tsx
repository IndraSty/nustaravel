"use client"
import Link from "next/link";
import React, { useState } from "react";
import { Satisfy } from "next/font/google";
import BoxInput from "@/components/BoxInput";
import ButtonAuth from "@/components/ButtonAuth";
import { useRouter } from "next/navigation";

const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
});

const DaftarPage = () => {
  const {push} = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegist = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true)

    const res = await fetch('/api/auth/daftar', {
      method: 'POST',
      body: JSON.stringify({
        fullname: e.target.fullname.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        password: e.target.password.value,
      })
    })
    if(res.status === 200) {
      e.target.reset()
      setIsLoading(false)
      push('/auth/login')
    } else {
      setError("Email Already Exist")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className={`${satisfy.className} text-3xl text-primary`}>
        Nustaravel
      </h1>
      <p className="text-miniText mt-2 mb-5">Silahkah Login dengan akun anda</p>
      {error !== '' && <p className="text-red-500 mt-2 mb-5">{error}</p>}
      <form className="w-full" onSubmit={(e) => handleRegist(e)}>
        <BoxInput
          id={"fullname"}
          label={"Nama"}
          type={"name"}
          placeHolder={"Nama Anda"}
        />
        <BoxInput
          id={"phone"}
          label={"Nomor Hp"}
          type={"text"}
          placeHolder={"example +62383838"}
        />
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
          <ButtonAuth label={isLoading ? "Loading..." : "Daftar"} disabled={isLoading} />
        </div>
      </form>

      <span className="w-[80%] py-2 mt-4 text-xs text-center text-miniText">
        Dengan membuat akun kamu menyetujui{" "}
        <span className="text-primary">Syarat & Ketentuan</span> dan{" "}
        <span className="text-primary">Kebijakan Privasi</span> Nustaravel.
      </span>

      <div className="absolute bottom-0 py-3 items-center">
        <span className="">
          Udah punya akun?{" "}
          <Link
            href={"/auth/login"}
            className="font-semibold text-primary cursor-pointer"
          >
            Log in aja!
          </Link>{" "}
        </span>
      </div>
    </div>
  );
};

export default DaftarPage;
