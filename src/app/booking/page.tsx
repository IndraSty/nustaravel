"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import CardBooking from "./CardBooking";
import NavbarComp from "@/components/NavbarComp";
import { useUserSession } from "@/features/auth/useUserSession";

const BookingPage = () => {
  const [history, setHistory] = useState([]);
  const { email } = useUserSession();

  useEffect(() => {
    async function getHistory() {
      const response = await axios.get(`/api/booking/history?email=${email}`);
      if (response.status == 200) {
        setHistory(response.data.result);
      }
    }
    getHistory();
  }, [email]);

  console.log(history)

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <NavbarComp title={"Booking History"} desc={""} />
      <br />
      <br />
      <br />
      <div className="flex flex-col px-5 gap-6 h-full py-5">
        {history.map((item) => (
          <div key={item.bookings.id}>
            <CardBooking history={item.bookings} status={item.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingPage;
