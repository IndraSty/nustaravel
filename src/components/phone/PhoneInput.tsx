import React from "react";
import { FaArrowLeft } from "react-icons/fa";

function PhoneInput({ onChange, isPhoneOpen, onSubmit, phone, name }) {
  return (
    <div className={`${isPhoneOpen ? "flex flex-col" : "hidden"}`}>
      <div className={`flex items-center gap-7`}>
        <FaArrowLeft />
        <h1 className="font-semibold text-xl">Masukkan Nomor Ponsel</h1>
      </div>
      <div className="flex flex-col gap-4 mt-10">
        <h2 className="text-lg font-semibold">Hi, {name}</h2>
        <p className="text-base text-miniText">
          Mau pemesanan dan transaksimu makin cepat? Verifikasi nomormu aja!
        </p>
        <div className="flex border border-secondary-text focus-within:border-blue-500 focus-within:border-2 rounded-md">
          <div className="flex items-center px-5 bg-blue-50 rounded-tl-md rounded-bl-md">
            <img src="/icons/indonesia.png" className="w-8" />
          </div>
          <div className="px-4 py-1">
            <label
              htmlFor="phone"
              className="block text-xs text-secondary-text"
            >
              Nomor Ponsel
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              placeholder="+62"
              onChange={onChange}
              className="w-full bg-white focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        {phone != null ? (
          <button
            onClick={onSubmit}
            className="p-3 text-white rounded-lg font-medium bg-primary"
          >
            Verifikasi Nomor Ponsel
          </button>
        ) : (
          <button
            disabled
            className="p-3 text-miniText rounded-lg font-medium bg-gray-200"
          >
            Verifikasi Nomor Ponsel
          </button>
        )}
      </div>
    </div>
  );
}

export default PhoneInput;
