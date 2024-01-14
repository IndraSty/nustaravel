"use client";
import NavbarComp from "@/components/NavbarComp";
import WideCardItems from "@/components/WideCardItems";
import { useFetchHotel } from "@/features/hotels/useFetchHotels";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const JakartaHotels = () => {
  const { data: hotels, isLoading } = useFetchHotel();

  return (
    <section>
      <div className="min-h-screen flex flex-col">
        <NavbarComp
          title={"Jakarta"}
          desc={"25 Des - 26 Des . 1 kamar . 1 Tamu"}
        />
        <br />
        <br />
        <br />
        <div className="px-5 py-3 gap-4 flex flex-col pb-10">
          {hotels?.data.result.map(
            (hotel: { id: string | number }, index: number) => (
              <Link key={hotel.id} href={`/hotels/${hotel.id}`}>
                <WideCardItems hotels={{ ...hotel }} />
              </Link>
            )
          )}
        </div>
        <div className="w-full h-2 bg-blue-50"></div>
      </div>
    </section>
  );
};

export default JakartaHotels;
