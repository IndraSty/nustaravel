"use client";
import { useOutsideAlerter } from "@/lib/utils/useOutsideAlerter";
import React, { useRef, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import DetailPesananBottomSheet from "./DetailPesananBottomSheet";

type Customer = {
  name: string;
  status: string;
  email: string;
  phone: string;
};

const dataCustomer: Customer = {
  name: "Indra Styawan",
  status: "Tuan",
  email: "mdsuardika064@gmail.com",
  phone: '',
};

const DetailPesanan = ({
  room,
  kamar,
  tamu,
  checkIn,
  checkOut,
  email,
  name,
  phone,
  night,
}) => {
  const dataCustomer2: Customer = {
    name,
    status: dataCustomer.status,
    email,
    phone
  }
  const [customer, setCustomer] = useState(dataCustomer2);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const bottomSheetRef = useRef(null);
  useOutsideAlerter(bottomSheetRef, setIsClicked);

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setCustomer(customer);
  };

  return (
    <div className="flex flex-col p-4 w-full min-h-screen gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Detail Pesanan</h2>
        <button
          onClick={() => setIsClicked(!isClicked)}
          className="flex flex-col gap-2 p-3 px-4 bg-white shadow-md rounded-md"
        >
          <div className="flex w-full items-center justify-between">
            <h4 className="font-semibold">{customer.status + " " + customer.name}</h4>
            <FaChevronRight className="text-xs" />
          </div>
          <p className="text-sm">{phone}</p>
          <p className="text-sm">{email}</p>  
        </button>
      </div>

      <DetailPesananBottomSheet
        isClicked={isClicked}
        bottomSheetRef={bottomSheetRef}
        setIsClicked={setIsClicked}
        customer={customer}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        name={name}
        phone={phone}
        email={email}
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-base font-semibold">Detail Menginap</h2>
        <div className="flex flex-col gap-2 bg-white shadow-md rounded-md">
          <div className="flex gap-3 p-3">
            <img
              src="https://www.eastparchotel.com/wp-content/uploads/2017/09/Premier-Room-Twin.jpg"
              className="w-14 h-14 object-cover rounded-md"
            />
            <div className="flex flex-col justify-between">
              <span className="text-sm font-semibold">
                {room.hotels.hotel_name}
              </span>
              <p className="text-xs">
                {checkIn} - {checkOut}
              </p>
              <p className="text-xs">
                {night} Malam • {kamar} Kamar
              </p>
            </div>
          </div>
          <div className="w-full h-1 bg-blue-50"></div>
          <div className="flex flex-col px-3 py-1">
            <div className="flex items-center justify-between">
              <span className="text-base">{room.type}</span>
              <FaChevronRight className="text-xs" />
            </div>
            <p className="text-xs">Tidak bisa refund & reschedule</p>
            <div className="flex flex-col gap-2 my-4">
              <div className="flex gap-2 items-center">
                <img src="/icons/user.png" className="w-3 h-3" />
                <p className="text-xs">{tamu} Tamu</p>
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
            <p className="my-3 text-sm">
              Kamar 1:{" "}
              <span className="font-semibold underline">
                Tuan Indra Styawan
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPesanan;
