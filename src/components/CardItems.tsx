import { useRouter } from "next/navigation";
import React from "react";
import { FaStar } from "react-icons/fa";

function CardItems({ hotels }) {
  const router = useRouter()
  return (
    <button onClick={() => router.push(`/hotels/${hotels.id}`)} className="max-h-[280px] max-w-1/2 flex flex-col rounded-lg items justify-between shadow-lg bg-white">
      <div className="w-full h-full">
        {hotels.hotelimages && hotels.hotelimages.length > 0 && (
          <img
            src={hotels.hotelimages[0].image_path}
            className="rounded-t-lg object-cover h-[60%]"
          />
        )}

        <div className="w-full text-start px-2 py-2">
          <h2 className="font-semibold leading-5">{hotels.hotel_name}</h2>
          <div className="flex mt-3 gap-3">
            <div className="flex items-center">
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
              <FaStar className="text-[10px]" />
            </div>
            <p className="text-[10px] text-ellipsis whitespace-nowrap overflow-hidden">
              {hotels.city}, {hotels.province}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-2 py-4 gap-1">
        <p className="text-[10px] line-through text-start">Rp.2.440.000</p>
        <span className="text-sm font-medium text-red-500">
          Rp.{new Intl.NumberFormat("id-ID").format(hotels.price)}
        </span>
      </div>
    </button>
  );
}

export default CardItems;
