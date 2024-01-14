import axios from "axios";
import { useEffect, useState } from "react";

export const useHotelData = (id: any) => {
  const [hotel, setHotel] = useState<Hotel[]>([]);
  const [facilityHotel, setFacilityHotel] = useState<HotelFacility[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const getHotelById = async () => {
    const response = await axios.get(`/api/hotels/${id}`);
    setHotel(response.data.result);
  };

  const getHotelFacility = async () => {
    const response = await axios.get(`/api/hotels/${id}/facilities`);
    setFacilityHotel(response.data.result);
  };

  const getHotelReviews = async () => {
    const response = await axios.get(`/api/hotels/${id}/reviews`);
    setReviews(response.data.result);
  };

  

  return {hotel, facilityHotel, reviews, getHotelById, getHotelFacility, getHotelReviews}
};
