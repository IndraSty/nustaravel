import axios from "axios";
import { useQuery } from "react-query";

export const useFetchHotel = () => {
  return useQuery({
    queryFn: async () => {
      const hotelResponse = await axios.get("/api/hotels");
        console.log(hotelResponse.data)
      return hotelResponse;

    },
    queryKey: ["fetch.hotels"],
  });
};
