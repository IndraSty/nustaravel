"use client";
import NavbarComp from "@/components/NavbarComp";
import WideCardItems from "@/components/WideCardItems";
import WideCardSkeleton from "@/components/WideCardSkeleton";
import { useFetchHotel } from "@/features/hotels/useFetchHotels";

const PopulerHotels = () => {
  const { data: hotels, isLoading } = useFetchHotel();
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarComp
        title={"Populer Hotel"}
        desc={"25 Des - 26 Des . 1 kamar . 1 Tamu"}
      />
      <br />
      <br />
      <br />
      <div className="px-5 py-3 gap-4 flex flex-col pb-10">
        {isLoading ? (
          <>
            <WideCardSkeleton />
            <WideCardSkeleton />
            <WideCardSkeleton />
          </>
        ) : (
          hotels?.data.result.map(
            (hotel: { id: string | number }) => (
              <WideCardItems key={hotel.id} hotels={{ ...hotel }} />
            )
          )
        )}
      </div>
      <div className="w-full h-2 bg-blue-50"></div>
    </div>
  );
};

export default PopulerHotels;
