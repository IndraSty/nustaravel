"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/checkout/Navbar";
import DetailPesanan from "@/components/checkout/DetailPesanan";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useUserSession } from "@/features/auth/useUserSession";
import BotNavbar from "@/components/checkout/BotNavbar";

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
  const [userName, setUserName] = useState("");
  const [noHp, setNohp] = useState("");

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
    const data = {
      id: roomId,
      name: room?.type,
      hotel_name: room?.hotels.hotel_name,
      amount: price,
      quantity: kamar
    };
  
    try {
      await axios.post("/api/tokenizer", data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (roomId && hotelId) {
      getRoomById();
    }
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
          name={userName}
          night={night}
          phone={noHp}
        />
      ) : null}
      <BotNavbar price={price} onClick={checkout} />
    </div>
  );
};

export default CheckoutPage;
