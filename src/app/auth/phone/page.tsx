"use client";
import PhoneInput from "@/components/phone/PhoneInput";
import VerifPhoneNumber from "@/components/phone/VerifPhoneNumber";
import { useUserSession } from "@/features/auth/useUserSession";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const PhoneInputPage = () => {
  const {push} = useRouter();
  const [isPhoneOpen, setIsPhoneOpen] = useState(true);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const { email, name } = useUserSession();

  const handlePhoneChange = (e: any) => {
    const value = e.target.value;
    setPhone(value);
  };

  const [phone, setPhone] = useState("");
  const handleSubmitPhone = async (e: any) => {
    e.preventDefault();
    if (phone !== "" && phone.length > 11) {
      const res = await axios.post(
        "/api/auth/sendOtp",
        { phone },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        setIsPhoneOpen(false);
        setIsOtpOpen(true);
      }
    }
  };

  const handleBackOtp = () => {
    setIsPhoneOpen(true);
    setIsOtpOpen(false);
  };

  return (
    <div className="w-screen min-h-screen px-5 py-20">
      <PhoneInput
        onChange={handlePhoneChange}
        isPhoneOpen={isPhoneOpen}
        onSubmit={handleSubmitPhone}
        phone={phone}
        name={name}
      />
      <VerifPhoneNumber
        onBack={handleBackOtp}
        isOtpOpen={isOtpOpen}
        phone={phone}
        email={email}
        push={push}
      />
    </div>
  );
};

export default PhoneInputPage;
