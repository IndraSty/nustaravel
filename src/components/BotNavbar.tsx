import Link from "next/link";
import React from "react";

type BotNavbarProps = {price: number}

const BotNavbar = ({hotel, onClick, isHidden}) => {
  return (
    <div className={`${isHidden ? "hidden" : "fixed"} bottom-0 md:px-20 py-4 z-[45]
     rounded-t-lg w-full shadow-top bg-white overflow-hidden`}>
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-sm font-semibold">Mulai Dari</span>
          <h1 className="text-red-500 font-semibold text-lg">
            IDR {new Intl.NumberFormat("id-ID").format(hotel.price)}
          </h1>
          <span className="text-xs text-miniText">/kamar/malam</span>
        </div>
        <button
          onClick={onClick}
          className="px-4 py-2 text-base font-semibold text-white rounded-md bg-primary"
        >
          Lihat Kamar
        </button>
      </div>
    </div>
  );
};

export default BotNavbar;
