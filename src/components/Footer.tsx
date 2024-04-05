import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

import { Satisfy } from "next/font/google";
import { listKota } from "@/data/kota";


const satisfy = Satisfy({
  subsets: ["latin"],
  weight: "400",
});

const Footer = () => {
  return (
    <div className="flex flex-col py-8 px-5 md:px-20">
        <h2 className={`${satisfy.className} text-2xl md:text-4xl pb-5`}>
          Nusavel.
        </h2>

        <div className="flex justify-between pr-4 md:pr-10 pb-3">
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-xl text-miniText" />
            <div className="flex flex-col leading-5">
              <span className="text-miniText text-xs">whatsapp</span>
              <span>+62 867 987 987</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaInstagram className="text-xl text-miniText" />
            <div className="flex flex-col leading-5">
              <span className="text-miniText text-xs">Instagram</span>
              <span className="text-xs">@_indraa02_</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between pr-4 md:pr-10 pb-8">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-xl text-miniText" />
            <div className="flex flex-col leading-5">
              <span className="text-miniText text-xs">Email</span>
              <span className="text-xs">indrastyawan064@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaTwitter className="text-xl text-miniText" />
            <div className="flex flex-col leading-5">
              <span className="text-miniText text-xs">Twitter</span>
              <span className="text-xs">@_indraa02_</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex py-5 justify-between pr-6 md:pr-0">
          <div className="flex flex-col">
            <h2 className="font-semibold text-base pb-3">Destinasi</h2>
            {listKota.map((kota) => (
              <span key={kota.id} className="text-sm">
                {kota.name}
              </span>
            ))}
          </div>
          <div className="flex flex-col pb-3">
            <h2 className="font-semibold text-base pb-3">Dukungan</h2>
            <span className="text-sm">Pusat Bantuan</span>
            <span className="text-sm">Group Booking</span>
            <span className="text-sm">Kebijakan Privasi</span>
            <span className="text-sm">Syarat & Ketentuan</span>
            <span className="text-sm">Daftarkan Hotel Kamu</span>
          </div>
        </div>
        <hr />
        <div className="flex flex-col py-5">
          <h2 className="font-semibold text-base pb-3">Ikuti Kami</h2>
          <div className="flex gap-4 pt-2 pb-4">
            <button className="flex justify-center items-center h-8 w-8 border border-miniText rounded-full text-lg">
              <FaFacebookF className="" />
            </button>
            <button className="flex justify-center items-center h-8 w-8 border border-miniText rounded-full text-lg">
              <FaTwitter />
            </button>
            <button className="flex justify-center items-center h-8 w-8 border border-miniText rounded-full text-lg">
              <FaLinkedinIn />
            </button>
            <button className="flex justify-center items-center h-8 w-8 border border-miniText rounded-full text-lg">
              <FaYoutube />
            </button>
            <button className="flex justify-center items-center h-8 w-8 border border-miniText rounded-full text-lg">
              <FaInstagram />
            </button>
            <button className="flex justify-center items-center h-8 w-8 border border-miniText rounded-full text-lg">
              <FaTiktok />
            </button>
          </div>
        </div>
        <hr />
        <span className="pt-4">&copy; {new Date().getFullYear()} PT. Nusantaravel Corp. All Rights Reserved.</span>
      </div>
  )
}

export default Footer
