"use client"
import { FaChevronLeft } from "react-icons/fa";
import { getTodayAndTomorrow } from "@/lib/utils/dateUtils";
import { format } from "date-fns";

const HotelNavbar = ({ hotel, onBackClick, CIandCO, onUbahClick, tamu, kamar }: any) => {

  return (
    <div className="fixed flex w-full shadow-bottom top-0 z-[40] justify-between px-5 py-4 items-center bg-white">
      <div className="flex gap-5">
        <button onClick={onBackClick}>
          <FaChevronLeft className="text-sm" />
        </button>
        <div className="flex flex-col">
          <h2 className="font-semibold text-base">{hotel.hotel_name}</h2>
          <span className="text-sm text-miniText">{`${format(CIandCO[0], "dd MMM")} - ${format(CIandCO[1], "dd MMM")} • ${kamar} Kamar • ${tamu} Tamu`}</span>
        </div>
      </div>
      <button onClick={onUbahClick} className="px-4 h-8 bg-blue-50 text-sm font-semibold rounded-md text-primary">
        Ubah
      </button>
    </div>
  );
};

export default HotelNavbar;
