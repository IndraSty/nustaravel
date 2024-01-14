"use client";
import BotNavbar from "@/components/BotNavbar";
import CardReview from "@/components/CardReview";
import CardRoom from "@/components/CardRoom";
import Faq from "@/components/Faq";
import BotSheetUbah from "@/components/hotels/BotSheetUbah";
import HotelNavbar from "@/components/hotels/HotelNavbar";
import { useHotelData } from "@/features/hotels/useHotelData";
import { useDraggable } from "@/lib/utils/useDraggable";
import { useOutsideAlerter } from "@/lib/utils/useOutsideAlerter";
import axios from "axios";
import { addDays } from "date-fns";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  FaBed,
  FaChevronDown,
  FaChevronLeft,
  FaChevronUp,
  FaClock,
  FaShareAlt,
  FaSquare,
  FaUser,
} from "react-icons/fa";

const DetailHotel = () => {

  const [isClicked, setIsClicked] = useState(false);
  const { containerRef, handleDragStart } = useDraggable();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [kamar, setKamar] = useState(1);
  const [tamu, setTamu] = useState(1);
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [isUbahClicked, setIsUbahClicked] = useState<boolean>(false);
  const bottomSheetRef = useRef(null);
  const checkIn = new Date();
  const checkOut = addDays(new Date(), 1);
  const [CIandCO, setCIandCO] = useState([checkIn, checkOut]);
  useOutsideAlerter(bottomSheetRef, setIsClicked);

  const router = useRouter();

  const { id } = useParams();
  const {
    hotel,
    facilityHotel,
    reviews,
    getHotelById,
    getHotelFacility,
    getHotelReviews,
  } = useHotelData(id);

  const getHotelRooms = async (id: string) => {
    const response = await axios.get(`/api/hotels/${id}/rooms`);
    setRooms(response.data.result);
  };

  const handleClick = () => {
    const element = document.getElementById("rooms");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUbahClick = () => {
    const element = document.getElementById("rooms");

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsUbahClicked(!isUbahClicked);
    }
  };

  const changeNav = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    if (id) {
      getHotelById();
      getHotelFacility();
      getHotelReviews();
      getHotelRooms(id);
    } else {
      <p>Hotel Id Not Found</p>;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHidden(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const target = document.getElementById("rooms");
    if (target) {
      observer.observe(target);
    }

    changeNav();
    window.addEventListener("scroll", changeNav);
  }, [id]);

  const categories = [...new Set(rooms.map((item) => item.category))];

  return (
    <section>
      <div className="min-h-screen w-screen flex flex-col">
        <BotSheetUbah
          isUbahClicked={isUbahClicked}
          setIsUbahClicked={setIsUbahClicked}
          ref={bottomSheetRef}
          kamar={kamar}
          tamu={tamu}
          setKamar={setKamar}
          setTamu={setTamu}
          CIandCO={CIandCO}
          setCIandCO={setCIandCO}
        />
        <BotNavbar hotel={hotel} onClick={handleClick} isHidden={isHidden} />
        {isScrolled ? (
          <HotelNavbar
            hotel={hotel}
            onBackClick={handleBackClick}
            onUbahClick={handleUbahClick}
            tamu={tamu}
            kamar={kamar}
            CIandCO={CIandCO}
          />
        ) : (
          <div id="topNav">
            <div
              onClick={() => router.back()}
              className="absolute cursor-pointer p-3 rounded-full text-white bg-black bg-opacity-30 top-4 left-4"
            >
              <FaChevronLeft />
            </div>
            <div className="absolute p-3 rounded-full text-white bg-black bg-opacity-30 top-4 right-4">
              <FaShareAlt />
            </div>
          </div>
        )}

        {hotel.hotelimages && hotel.hotelimages.length > 0 && (
          <div className="flex flex-col h-auto gap-1">
            <div className="w-full">
              <img
                src={hotel.hotelimages[0].image_path}
                className="object-cover h-[200px] w-full"
              />
            </div>
            <div className="flex gap-1 h-[100px] w-full">
              <img src={hotel.hotelimages[1].image_path} className="w-1/3" />
              <img src={hotel.hotelimages[2].image_path} className="w-1/3" />
              <img src={hotel.hotelimages[3].image_path} className="w-1/3" />
            </div>
          </div>
        )}
        <div className="flex flex-col p-3 mb-3 gap-3">
          <h1 className="text-xl font-semibold">{hotel.hotel_name}</h1>
          <div className="flex gap-3 items-center">
            <p className="text-xs text-miniText">
              <span className="text-base font-semibold text-black">4.3</span>/5
            </p>
            <p className="text-miniText text-sm">({reviews.length} Review) </p>•{" "}
            <p className="text-miniText text-sm">
              {" "}
              {hotel.city}, {hotel.province}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex gap-2 items-center">
              <FaBed /> <p className="text-xs text-miniText">2 Kamar</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaUser className="text-xs" />{" "}
              <p className="text-xs text-miniText">4 Tamu</p>
            </div>
            <div className="flex gap-2 items-center">
              <FaSquare className="text-xs" />{" "}
              <p className="text-xs text-miniText">
                50.0m<sup>2</sup>
              </p>
            </div>
          </div>
        </div>
        <div className="w-full h-2 bg-blue-50"></div>

        <div className="flex flex-col px-3 py-5">
          <h2 className="text-lg font-semibold mb-3">Serunya Nginep Di Sini</h2>

          <div className="flex py-3 items-center gap-4">
            <img src="/money-bag.png" className="w-10 h-10" />
            <div className="flex flex-col">
              <h4 className="font-semibold">Harga Sesuai Kualitas</h4>
              <p className="text-sm text-miniText">
                96% tamu puas nginep disini dan
                <br /> menganggap kualitasnya sesuai harga.
              </p>
            </div>
          </div>

          <div className="flex py-3 items-center gap-4">
            <img src="/star.png" className="w-10 h-10" />
            <div className="flex flex-col">
              <h4 className="font-semibold">Tempat Bersih, Layanan Keren</h4>
              <p className="text-sm text-miniText">
                96% tamu menilai kebersihan dan layanan di akomodasi ini
                fantastis
              </p>
            </div>
          </div>

          <div className="flex py-3 items-center gap-4">
            <img src="/location.png" className="w-10 h-10" />
            <div className="flex flex-col">
              <h4 className="font-semibold">Lokasinya Strategis</h4>
              <p className="text-sm text-miniText">
                Dekat stasiun kereta, restoran, dan landmark lain.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-2 mt-3 bg-blue-50"></div>

        <div className="flex flex-col px-3 py-5">
          <h2 className="text-lg font-semibold mb-3">Review</h2>
          <div
            ref={containerRef}
            onMouseDown={handleDragStart}
            className="flex w-full gap-2 overflow-x-hidden cursor-pointer py-1"
          >
            {reviews.map((rev, index) => (
              <CardReview key={index} review={rev} />
            ))}
          </div>
        </div>

        <div className="w-full h-2 mt-3 bg-blue-50"></div>

        <div className="flex flex-col px-3 py-5">
          <h2 className="text-lg font-semibold mb-3">Fasilitas Hotel</h2>
          <div className="grid grid-cols-2 px-3 py-2 gap-3">
            {facilityHotel.map((item, index) => (
              <div key={index} className="flex gap-3 items-center">
                <img src={item.facilities.icon} className="w-4 h-4" />
                <span className="text-miniText font-semibold">
                  {item.facilities.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-2 mt-3 bg-blue-50"></div>

        <div className="flex flex-col px-3 py-5">
          <h2 className="text-lg font-semibold mb-3">Lokasi</h2>
          <p className="text-sm text-miniText">{hotel.hotel_address}</p>
        </div>

        <div className="w-full h-2 mt-3 bg-blue-50"></div>

        <div className="flex flex-col px-3 py-5">
          <h2 className="text-lg font-semibold mb-3">Kebijakan Akomodasi</h2>
          <div className="flex items-center gap-2">
            <FaClock className="text-miniText text-xl" />
            <h4 className="font-semibold">Prosedur Check-In</h4>
          </div>
          <div className="flex gap-4 pl-7 mt-6">
            <div className="flex flex-col gap-2">
              <p className="text-xs">Check In</p>
              <h3 className="font-semibold text-xl">{hotel.check_in}</h3>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-xs">Check In</p>
              <h3 className="font-semibold text-xl">{hotel.check_out}</h3>
            </div>
          </div>
        </div>

        <div className="w-full h-2 mt-3 bg-blue-50"></div>

        <div className="flex flex-col px-3 py-5">
          <h2 className="text-lg font-semibold mb-3">Tentang</h2>
          <p
            className={`text-miniText ${
              isClicked ? "line-clamp-none" : "line-clamp-4"
            }`}
          >
            {hotel.hotel_description}
          </p>
          {!isClicked ? (
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="flex w-1/3 items-center gap-3 mt-5 font-semibold text-primary"
            >
              Selengkapnya <FaChevronDown className="text-sm mt-1" />
            </button>
          ) : (
            <button
              onClick={() => setIsClicked(!isClicked)}
              className="flex w-1/2 items-center gap-3 mt-5 font-semibold text-primary"
            >
              Lihat Lebih Sedikit <FaChevronUp className="text-sm mt-1" />
            </button>
          )}
        </div>

        <div className="w-full h-2 mt-3 bg-blue-50"></div>

        <section id="rooms">
          <div>
            <div className="flex flex-col px-3 py-5">
              <h2 className="text-lg font-semibold mb-3">
                Tipe Kamar dan Harga
              </h2>
            </div>
            <div className="bg-blue-50">
              {hotel.hotelimages && hotel.hotelimages.length > 0 && (
                <img
                  src={hotel.hotelimages[2].image_path}
                  className="w-full h-[180px]"
                />
              )}
              {categories.map((item, index) => (
                <div key={index} className="flex flex-col px-3 py-5">
                  <h3 className="text-lg font-semibold mb-3">{item}</h3>
                  {rooms.map(
                    (room) =>
                      room.category === item && (
                        <CardRoom
                          key={room.id}
                          rooms={room}
                          hotel={hotel}
                          kamar={kamar}
                          tamu={tamu}
                          CIandCO={CIandCO}
                        />
                      )
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq />
      </div>
    </section>
  );
};

export default DetailHotel;
