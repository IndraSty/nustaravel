import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

type DetailPesananBottomSheetProops = {
  isClicked: boolean;
  bottomSheetRef: React.MutableRefObject<null>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  customer: any;
  onChange: any;
  onSubmit: any;
  name: string;
  phone: string;
  email: string;
};

const DetailPesananBottomSheet = ({
  isClicked,
  bottomSheetRef,
  setIsClicked,
  customer,
  onChange,
  onSubmit,
  name,
  phone,
  email
}: DetailPesananBottomSheetProops) => {
  return (
    <div className="z-[9999]">
      <motion.div
        animate={
          isClicked
            ? { opacity: 0.6, zIndex: 3 }
            : { opacity: 0, display: "none" }
        }
        initial={{ opacity: 0 }}
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
      />
      <AnimatePresence initial={false}>
        {isClicked && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { y: 0, height: "auto" },
              collapsed: { y: "100%", height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="fixed bottom-0 right-0 left-0 z-10 w-full rounded-t-2xl border-2 border-b-0 border-gray-50 bg-white shadow-[0px_-8px_20px_-6px_rgba(0,0,0,0.3)]"
          >
            <div ref={bottomSheetRef} className="h-110 p-4">
              <div className="mb-2 flex justify-end">
                <FaTimes
                  className="w-6 cursor-pointer"
                  onClick={() => setIsClicked(false)}
                />
              </div>
              <h2 className="mb-3 text-xl font-bold">Detail Pemesan</h2>
              <hr className="pb-5 " />
              <form onSubmit={onSubmit}>
                <div className="flex items-center w-full gap-5">
                  <div className="flex items-center">
                    <input
                      id="tuan"
                      name="status"
                      type="radio"
                      value="Tuan"
                      checked={customer.status === "Tuan"}
                      onChange={onChange}
                      className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="tuan" className="ml-2 text-base text-black">
                      Tuan
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="nyonya"
                      name="status"
                      type="radio"
                      value="Nyonya"
                      checked={customer.status === "Nyonya"}
                      onChange={onChange}
                      className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label
                      htmlFor="nyonya"
                      className="ml-2 text-base text-black"
                    >
                      Nyonya
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="nona"
                      name="status"
                      type="radio"
                      value="Nona"
                      checked={customer.status === "Nona"}
                      onChange={onChange}
                      className="w-4 h-4 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="nona" className="ml-2 text-base text-black">
                      Nona
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-5">
                  <div className="px-4 py-1 border border-secondary-text focus-within:border-blue-500 focus-within:border-2 rounded-md">
                    <label
                      htmlFor="fullname"
                      className="block text-xs text-secondary-text"
                    >
                      Nama Lengkap Sesuai Identitas
                    </label>
                    <input
                      type="fullname"
                      name="name"
                      id="fullname"
                      value={customer.name}
                      onChange={onChange}
                      className="w-full bg-white focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="flex border border-secondary-text focus-within:border-blue-500 focus-within:border-2 rounded-md">
                    <div className="flex items-center px-5 bg-blue-50 rounded-tl-md rounded-bl-md">
                      <img src="/icons/indonesia.png" className="w-8" />
                    </div>
                    <div className="px-4 py-1">
                      <label
                        htmlFor="phone"
                        className="block text-xs text-secondary-text"
                      >
                        Nomor Ponsel
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={onChange}
                        className="w-full bg-white focus:outline-none focus:ring-0"
                      />
                    </div>
                  </div>
                  <div className="px-4 py-1 border bg-blue-50 border-secondary-text focus-within:border-blue-500 focus-within:border-2 rounded-md">
                    <label
                      htmlFor="email"
                      className="text-xs text-secondary-text"
                    >
                      Nama Lengkap Sesuai Identitas
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      disabled
                      value={email}
                      onChange={onChange}
                      className="w-full focus:outline-none focus:ring-0"
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={() => setIsClicked(false)}
                    className="p-3 rounded-lg w-full bg-primary text-white"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailPesananBottomSheet;
