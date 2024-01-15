"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const BookingPage = () => {
  const searchParam = useSearchParams();
  const orderId = searchParam.get("order_id");

  useEffect(() => {
    const checkDetail = async () => {
      const secret = process.env.NEXT_PUBLIC_SECRET;
      const encodedSecret = Buffer.from(secret).toString("base64");
      const basicAuth = `Basic ${encodedSecret}`;

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/v2/${orderId}/status`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: basicAuth,
            },
          }
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error(`Error fetching transaction details: ${error}`);
      }
    };

    checkDetail();
  }, [orderId]);
  return <div></div>;
};

export default BookingPage;
