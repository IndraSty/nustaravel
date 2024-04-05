import React from "react";
import { FaChevronRight } from "react-icons/fa";

const CardBooking = ({ history, status }: any) => {
  let checkIn = history.check_in_date
  let checkOut = history.check_out_date
  let date = new Date(history.booking_date);
  let options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = new Intl.DateTimeFormat("id-ID", options).format(date);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 bg-white shadow-md rounded-md">
        <div className="flex justify-between px-3 py-2">
          <p className="text-miniText text-xs">
            Id Booking: {history.id}
          </p>
          <p className="text-miniText text-xs">{formattedDate}</p>
        </div>
        <div className="flex px-3 w-full justify-between">
          <div className="flex gap-3">
            <img
              src="https://www.eastparchotel.com/wp-content/uploads/2017/09/Premier-Room-Twin.jpg"
              className="w-14 h-14 object-cover rounded-md"
            />
            <div className="flex flex-col justify-between">
              <span className="text-sm font-semibold">{history.hotels.hotel_name}</span>
              <p className="text-xs">{checkIn} - {checkOut}</p>
              <p className="text-xs text-green-500 font-semibold">Paid</p>
            </div>
          </div>
        </div>
        <div className="w-full h-1 bg-blue-50"></div>
        <div className="flex flex-col px-3 py-1">
          <div className="flex items-center justify-between">
            <span className="text-base">{history.rooms.type}</span>
            <FaChevronRight className="text-xs" />
          </div>
          <p className="text-xs">Tidak bisa refund & reschedule</p>
          <div className="flex flex-col gap-2 my-4">
            <div className="flex gap-2 items-center">
              <img src="/icons/user.png" className="w-3 h-3" />
              <p className="text-xs">1 Tamu</p>
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
          <hr />
          <div className="flex py-3 justify-between">
            <span className="text-red-400 text-sm font-medium">
              {status}
            </span>
            <span className="text-red-500 font-semibold text-sm">
              IDR {new Intl.NumberFormat('id-ID').format(history.payments[0].amount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBooking;
