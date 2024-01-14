import NavbarComp from "@/components/NavbarComp";
import WideCardItems from "@/components/WideCardItems";
import { useFetchHotel } from "@/features/hotels/useFetchHotels";

const JogjaHotels = () => {
  const { data: hotels, isLoading } = useFetchHotel();

  return (
    <section>
      <div className="min-h-screen flex flex-col">
        <NavbarComp
          title={"Jogja"}
          desc={"25 Des - 26 Des . 1 kamar . 1 Tamu"}
        />
        <br />
        <br />
        <br />
        <div className="px-5 py-3 gap-4 flex flex-col pb-10">
          {hotels?.data.result.map(
            (hotel: { id: string | number }, index: number) => (
              <WideCardItems key={hotel.id} hotels={{ ...hotel }} />
            )
          )}
        </div>
        <div className="w-full h-2 bg-blue-50"></div>
      </div>
    </section>
  );
};

export default JogjaHotels;
