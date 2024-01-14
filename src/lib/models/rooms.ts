
type Hotels = {
    hotel_name: string
}

type Room = {
    id: string;
    hotel_id: string;
    type: string;
    price: number;
    availability: number;
    category: string;
    hotels: Hotels
}