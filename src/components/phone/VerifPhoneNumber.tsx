import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

let currentOtpIndex: number = 0;

function VerifPhoneNumber({ onBack, isOtpOpen, phone, email, push }) {
  const [theOtp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOtp: string[] = [...theOtp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);

    if (!value) setActiveOtpIndex(currentOtpIndex - 1);
    else setActiveOtpIndex(currentOtpIndex + 1);

    setOtp(newOtp);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") setActiveOtpIndex(currentOtpIndex - 1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const handleOtpVerify = async () => {
    let otp = theOtp.join("");
    if (theOtp.length != 0) {
      const res = await axios.post(
        "/api/auth/verifyOtp",
        { otp },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.status === "approved") {
        const res = await axios.put(
          "/api/auth/phone",
          { phone, email },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if(res.status === 200){
          console.log(res.data.message)
          push('/')
        }
      }
      console.log(res.data.status);
    }
  };

  //   console.log(otp)

  return (
    <div className={`${isOtpOpen ? "flex" : "hidden"} flex-col gap-6`}>
      <div className="flex items-center gap-7">
        <button onClick={onBack}>
          <FaArrowLeft />
        </button>
        <h1 className="font-semibold text-xl">Verifikasi Nomor Ponselmu</h1>
      </div>
      <div className="flex w-full flex-col justify-center items-center">
        <p className="text-base text-miniText">
          Isi dengan kode OTP yang dikirm ke:{" "}
        </p>
        <span className="text-balance mb-4 text-black font-semibold">
          {phone}.
        </span>
        <div className="flex gap-4 my-6">
          {theOtp.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <input
                  ref={index === activeOtpIndex ? inputRef : null}
                  type="text"
                  className="w-12 h-12 border-b-4 bg-transparent outline-none
                    text-center font-semibold text-xl border-gray-200
                    focus:border-primary focus:text-gray-700 text-gray-400
                    transition"
                  onChange={handleOnChange}
                  value={theOtp[index]}
                  onKeyDown={(e) => handleOnKeyDown(e, index)}
                />
              </React.Fragment>
            );
          })}
        </div>
        <p className="text-miniText font-medium">
          Kirimkan kode OTP baru{" "}
          <span className="text-black font-semibold">20d</span>{" "}
        </p>
        <button
          onClick={handleOtpVerify}
          className="w-72 py-2 mt-3 text-white rounded-lg font-medium bg-primary"
        >
          Verifikasi
        </button>
      </div>
    </div>
  );
}

export default VerifPhoneNumber;
