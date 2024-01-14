import { FORM_STEPS } from "@/data/checkout";
import React from "react";
import { FaChevronLeft } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="flex flex-col bg-white p-4 gap-3">
      <div className="flex gap-4 items-center">
        <FaChevronLeft className="text-xs" />
        <h2 className="font-semibold text-base">Selesaikan Pemesananmu</h2>
      </div>
      <div className="flex gap-2 px-5 items-center text-ellipsis overflow-hidden whitespace-nowrap w-full">
        <div className="flex gap-1 items-center">
          <div className="flex justify-center items-center bg-primary w-5 h-5 rounded-full">
            <span className="text-white text-xs text-center">1</span>
          </div>
          <span className="text-xs">{FORM_STEPS[0].label}</span>
        </div>
        ---
        <div className="flex gap-1 items-center">
          <div className="flex justify-center items-center bg-primary w-5 h-5 rounded-full">
            <span className="text-white text-xs text-center">2</span>
          </div>
          <span className="text-xs">{FORM_STEPS[1].label}</span>
        </div>
        ---
        <div className="flex gap-1 items-center">
          <div className="flex justify-center items-center bg-primary w-5 h-5 rounded-full">
            <span className="text-white text-xs text-center">3</span>
          </div>
          <span className="text-xs">{FORM_STEPS[2].label}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
