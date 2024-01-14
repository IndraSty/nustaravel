"use client";
import CardItems from "@/components/CardItems";
import CityCard from "@/components/CityCard";
import { listKota } from "@/data/kota";
import { Poppins } from "next/font/google";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useFetchHotel } from "@/features/hotels/useFetchHotels";
import { daftar } from "@/lib/database/service";
import { useDraggable } from "@/lib/utils/useDraggable";
import CardSkeleton from "@/components/CardSkeleton";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

export default function Home() {
  const { data: hotels, isLoading } = useFetchHotel();
  const { containerRef, handleDragStart, isGrab } = useDraggable();

  return (
    <main className="">
      <div className="bg-my-image h-screen w-full bg-cover">
        <div className="w- h-full bg-black bg-opacity-40">
          <div className="h-full flex flex-col items-center justify-center text-white">
            <h1
              className={`${poppins.className} flex gap-2 text-center text-2xl lg:text-4xl`}
            >
              Mau Nginep Di{" "}
              <span className="text-yellow-400">
                <Typewriter
                  options={{
                    strings: [
                      "Bali",
                      "Jogja",
                      "Jakarta",
                      "Bandung",
                      "Surabaya",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </span>
            </h1>
            <p className="pb-10 lg:w-1/2 text-sm lg:text-base px-8 lg:px-0 text-center pt-5">
              Nikmati kemudahan booking hotel murah dan banyak promo secara
              online untuk semua hotel di seluruh Nusantara. Jangan lewatkan
              kesempatan nginep di hotel impian dengan harga yang terjangkau.
            </p>
            <Link
              href={"#"}
              className="px-8 py-2 lg:py-3 rounded-lg font-medium bg-primary hover:bg-primary-hover text-base"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      <div className="min-h-screen bg-white px-5 py-10 flex flex-col">
        <h1 className="text-lg font-bold mb-2">
          Cek Hotel Yang Lagi Populer Nih!🤩
        </h1>
        <p className="text-sm w-[80%] text-miniText">
          Yuk cek hotel yang lagi populer nih siapa tahu bisa jadi hotel
          pilihanmu nich!🏆
        </p>
        <div className="grid grid-cols-2 py-8 gap-4 w-full">
        {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            // Tampilkan CardItems saat data sudah selesai dimuat
            hotels?.data.result.map(
              (hotel: { id: string | number }, index: number) =>
                index < 4 && <CardItems key={hotel.id} hotels={{ ...hotel }} />
            )
          )}
        </div>
        <button className="w-full bg-blue-100 py-3 rounded-md font-semibold text-[16px] text-primary">
          <Link href="/hotels/populerHotel">Lihat Semua</Link>
        </button>
      </div>

      <div className="w-full h-2 bg-blue-50 mt-[-15px]"></div>

      <div className="min-h-screen bg-white px-5 py-5 flex flex-col">
        <h1 className="text-lg font-bold mb-2">Liburan Di Kota Impianmu!🏙️</h1>
        <p className="text-sm w-[80%] text-miniText">
          Dapatkan dikon hingga 50%+5% buat nginep di Bali dan Jogja pas akhir
          tahun!💸
        </p>
        <div className="grid grid-cols-2 py-8 gap-4 w-full">
          {isLoading ? (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          ) : (
            // Tampilkan CardItems saat data sudah selesai dimuat
            hotels?.data.result.map(
              (hotel: { id: string | number }, index: number) =>
                index < 4 && <CardItems key={hotel.id} hotels={{ ...hotel }} />
            )
          )}
        </div>
        <button className="w-full bg-blue-100 py-3 rounded-md font-semibold text-[16px] text-primary">
          <Link href={"/hotels/dreamsHotel"}>Lihat Semua</Link>
        </button>
      </div>

      <div className="w-full h-2 bg-blue-50"></div>

      <div className="bg-white px-5 py-5 flex flex-col">
        <h1 className="text-lg font-bold mb-2">
          Nginep Asik Di Destinasi Favorite
        </h1>
        <p className="text-sm w-[90%] text-miniText">
          Saatnya kasih reward ke diri sendiri dengan rileks di hotel di
          berbagai destinasi domestik menarik
        </p>
        <div
          ref={containerRef}
          onMouseDown={handleDragStart}
          className="flex overflow-x-hidden gap-3 pt-5"
        >
          {listKota.map((kota) => (
            <CityCard key={kota.id} kota={{ ...kota }} isGrab={isGrab} />
          ))}
        </div>
      </div>

      <div className="w-full h-2 bg-blue-50"></div>
    </main>
  );
}
