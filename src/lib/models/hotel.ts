type HotelImage = {
  image_path: string;
};

type HotelFacility = {
  facilities: {
    name: string;
    icon: string;
  };
};

type Review = {
  users: {
    fullname: string;
  };
  text: string;
  rating: number;
};

type Rooms = {
  id: string;
  type: string;
  price: number;
  availability: number;
  category: string
}

type Hotel = {
  id: string;
  hotel_name: string;
  hotel_address: string;
  hotel_description: string;
  hotel_rating: number;
  city: string;
  province: string;
  price: number;
  check_in: string;
  check_out: string;
  hotelimages: HotelImage[];
  hotelfacilities: HotelFacility[];
  reviews: Review[];
};
