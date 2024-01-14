import React from "react";
import { FaStar } from "react-icons/fa";

const WideCardItems = ({ hotels }) => {
  return (
    <div className="flex flex-col min-w-full h-[20rem] rounded-lg shadow-md">
      <div className="flex gap-1 overflow-hidden">
        <img
          src={hotels.hotelimages[0].image_path}
          alt=""
          className="rounded-tl-lg w-1/2 object-cover"
        />
        <img
          src={hotels.hotelimages[1].image_path}
          alt=""
          className="rounded-tr-lg w-1/2 object-cover"
        />
      </div>
      <div className="flex px-3 gap-3 pt-3">
        <h2 className="font-bold text-[17px]">{hotels.hotel_name}</h2>
        <div className="flex items-center">
          <FaStar className="text-[10px]" />
          <FaStar className="text-[10px]" />
          <FaStar className="text-[10px]" />
          <FaStar className="text-[10px]" />
          <FaStar className="text-[10px]" />
        </div>
      </div>
      <div className="flex px-3 ">
        <p className="text-xs text-miniText">
          👍<span className="font-bold text-sm text-black">4.8</span>/5 • {hotels.city},{" "}
          {hotels.province}
        </p>
      </div>

      <div className="flex flex-col w-full items-end px-3 py-3 gap-1">
        <div className="px-1 py-1 bg-red-500 rounded-md right-0 w-1/3">
          <p className="text-xs text-white">Member Deals 5%</p>
        </div>
        <div className="flex items-center gap-2">
            <span className="text-miniText text-xs font-semibold line-through">IDR 867.740</span>
            <span className="px-2 py-1 bg-yellow-200 rounded-md text-xs text-red-600">-10%</span>
        </div>
        <h2 className="text-lg font-semibold text-red-500">IDR {new Intl.NumberFormat('id-ID').format(hotels.price)}</h2>
      <p className="text-xs text-miniText">/kamar/malam (termasuk pajak)</p>
      </div>
    </div>
  );
};

export default WideCardItems;
