"use client";
import { differenceInDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { id } from "date-fns/locale";
import { FaChevronRight } from "react-icons/fa";

const CardRoom = ({ rooms, hotel, kamar, tamu, CIandCO }) => {
  const router = useRouter();
  const night = differenceInDays(CIandCO[1], CIandCO[0])
  const day1 = format(CIandCO[0], "EEE, d MMM yyyy", {locale: id});
  const day2 = format(CIandCO[1], "EEE, d MMM yyyy", {locale: id});
  return (
    <div className="flex flex-col p-4 bg-white rounded-lg mb-3">
      <div className="flex w-full justify-between items-center">
        <h4 className="font-semibold">{rooms.type}</h4>
        <FaChevronRight className="text-xs" />
      </div>
      <p className="mt-2 text-sm mb-5">Tidak bisa refund & reschedule</p>
      <hr />
      <div className="flex flex-col gap-2 my-4">
        <div className="flex gap-2 items-center">
          <img src="/icons/user.png" className="w-3 h-3" />
          <p className="text-xs">2 Tamu</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/icons/bed.png" className="w-3 h-3" />
          <p className="text-xs">1 King</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/icons/wifi.png" className="w-3 h-3" />
          <p className="text-xs">WiFi Gratis</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src="/icons/cutlery.png" className="w-3 h-3" />
          <p className="text-xs">Sarapan (2pax)</p>
        </div>
      </div>
      <div className="flex w-full justify-between mt-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-lg text-red-500">
            IDR {new Intl.NumberFormat("id-ID").format(rooms.price)}
          </h2>
          <p className="text-[10px] font-semibold">
            /kamar/malam (termasuk pajak)
          </p>
        </div>
        <button
          onClick={() =>
            router.push(
              `/hotels/checkout?hotel_id=${hotel.id}&room_id=${rooms.id}&kamar=${kamar}&tamu=${tamu}&check_in=${day1}&check_out=${day2}&night=${night}`
            )
          }
          className="px-5 py-0.5 bg-primary rounded-md text-white font-semibold"
        >
          Pesan
        </button>
      </div>
    </div>
  );
};

export default CardRoom;
