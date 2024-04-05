import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useTamuCounter } from "@/lib/utils/useCountTamuRoom";

function BotSheetCountRoom({
  isTamuClicked,
  setIsTamuClicked,
  ref,
  setUbah,
  setTempKamar,
  setTempTamu
}: any) {
  const { tamu, kamar, tambahKamar, tambahTamu, kurangKamar, kurangTamu } =
    useTamuCounter();
  const handleClose = () => {
    setIsTamuClicked(false);
    setUbah(true);
  };

  const handleSubmit = () => {
    setTempKamar(kamar);
    setTempTamu(tamu);
    setIsTamuClicked(false);
    setUbah(true);
  };
  return (
    <div className="z-[99]">
      <motion.div
        animate={
          isTamuClicked
            ? { opacity: 0.6, zIndex: 3 }
            : { opacity: 0, display: "none" }
        }
        initial={{ opacity: 0 }}
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
      />
      <AnimatePresence initial={false}>
        {isTamuClicked && (
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
            <div ref={ref} className="h-110 p-4 gap-3 md:px-20 flex flex-col">
              <div className="mb-2 flex justify-end">
                <FaTimes className="w-6 cursor-pointer" onClick={handleClose} />
              </div>
              <h2 className="mb-3 text-xl font-bold">Kamar & Tamu</h2>
              <hr className="pb-3 " />
              <div className="flex flex-col w-full gap-4">
                <div className="flex w-full items-center justify-between">
                  <span>Kamar</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={kurangKamar}
                      className="w-6 h-6 text-3xl flex items-center justify-center rounded-full border-2 border-gray-300"
                    >
                      <span className="mb-2 text-gray-300">-</span>
                    </button>
                    <span>{kamar}</span>
                    <button
                      onClick={tambahKamar}
                      className="w-6 h-6 text-2xl flex items-center justify-center rounded-full border-2 border-primary"
                    >
                      <span className="mb-[5px] text-primary">+</span>
                    </button>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between">
                  <span>Tamu</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={kurangTamu}
                      className="w-6 h-6 text-3xl flex items-center justify-center rounded-full border-2 border-gray-300"
                    >
                      <span className="mb-2 text-gray-300">-</span>
                    </button>
                    <span>{tamu}</span>
                    <button
                      onClick={tambahTamu}
                      className="w-6 h-6 text-2xl flex items-center justify-center rounded-full border-2 border-primary"
                    >
                      <span className="mb-[5px] text-primary">+</span>
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="p-3 mt-3 rounded-lg w-full bg-primary text-white"
                >
                  Selesai
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BotSheetCountRoom;
