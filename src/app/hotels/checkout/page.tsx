"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/checkout/Navbar";
import DetailPesanan from "@/components/checkout/DetailPesanan";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useUserSession } from "@/features/auth/useUserSession";
import BotNavbar from "@/components/checkout/BotNavbar";
import cuid from "cuid";

const CheckoutPage = () => {
  const searchParam = useSearchParams();
  const roomId = searchParam.get("room_id");
  const hotelId = searchParam.get("hotel_id");
  const tamu = parseInt(searchParam.get("tamu"));
  const kamar = parseInt(searchParam.get("kamar"));
  const night = parseInt(searchParam.get("night"));
  const checkIn = searchParam.get("check_in");
  const checkOut = searchParam.get("check_out");
  const [room, setRoom] = useState<Room>();
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { email, name, phone } = useUserSession();
  const [userName, setUserName] = useState(name);
  const [noHp, setNohp] = useState(name);

  const getRoomById = async () => {
    setIsLoading(true);
    const response = await axios.get(`/api/hotels/${hotelId}/rooms/${roomId}`);

    if (response.status == 200) {
      setRoom(response.data.result);
    }
    setIsLoading(false);
  };

  // const handleAddBooking = async () => {
  //   await axios.post(`/api/booking?email=${email}&room_id=${roomId}`, {
  //     checkIn,
  //     checkOut
  //   })
  // }

  const checkout = async () => {
    const booking = await axios.post(
      `/api/booking?email=${email}&room_id=${roomId}`,
      {
        checkIn,
        checkOut,
      }
    );

    const bookingId = await booking.data.result.id;
    console.log(bookingId);

    const data = {
      id: bookingId,
      name: room?.type,
      hotel_name: room?.hotels.hotel_name,
      amount: price,
      quantity: kamar,
      first_name: name,
      email: email,
      phone: phone,
    };

    const response = await axios.post("/api/tokenizer", data);

    window.snap.pay(response.data.token, {
      onPending: async function (result) {
        const data = {
          booking_id: bookingId,
          amount: price,
          method: "",
          status: "Unpaid - Pending",
        };

        await axios.post(`/api/booking/payment?booking_id=${bookingId}`, data);
      },
      onClose: async function () {
        console.log("customer closed the popup without finishing the payment");
        const data = {
          booking_id: bookingId,
          amount: price,
          method: "",
          status: "Unpaid - Unfinished Payment",
        };

        await axios.post(`/api/booking/payment?booking_id=${bookingId}`, data);
      },
    });
  };

  useEffect(() => {
    async function getRoom() {
      if (roomId && hotelId) {
        await getRoomById();
      }
    }
    getRoom();
  }, [searchParam]);

  useEffect(() => {
    if (name) {
      setUserName(name);
    }
    if (phone) {
      setNohp(phone);
    }
  }, [name, phone]);

  useEffect(() => {
    if (room) {
      if (kamar > 1 && night > 1) {
        let harga = room.price * kamar * night;
        console.log(harga);
        setPrice(harga);
      } else if (kamar === 1 && night === 1) {
        setPrice(room.price);
      } else if (kamar > night || night > kamar) {
        let harga = room.price * kamar * night;
        setPrice(harga);
      }
    }
  }, [room, kamar, night]);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_CLIENT;
    const script = document.createElement("script");

    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen w-screen bg-blue-50">
      <Navbar />
      {isLoading ? (
        <div>Loading...</div>
      ) : room ? (
        <DetailPesanan
          room={room}
          kamar={kamar}
          tamu={tamu}
          checkIn={checkIn}
          checkOut={checkOut}
          email={email}
          name={name}
          night={night}
          phone={phone}
        />
      ) : null}
      <BotNavbar price={price} onClick={checkout} />
    </div>
  );
};

export default CheckoutPage;
