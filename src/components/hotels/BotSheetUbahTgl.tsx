"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { differenceInDays, format } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

function BotSheetUbahTgl({
  isTglClicked,
  setIsTglClicked,
  setUbah,
  ref,
  handleClose,
  setTempCIandCO,
  tempCIandCO,
}) {
  const [range, setRange] = useState([
    {
      startDate: tempCIandCO[0],
      endDate: tempCIandCO[1],
      key: "selection",
    },
  ]);

  const { startDate, endDate } = range[0];
  const numberOfNight = differenceInDays(endDate, startDate);
  const today = format(startDate, "dd MMM");
  const tommorow = format(endDate, "dd MMM");

  const handleSubmit = () => {
    setTempCIandCO([today, tommorow]);
    setIsTglClicked(false);
    setUbah(true);
  };
  return (
    <div className="z-[99]">
      <motion.div
        animate={
          isTglClicked
            ? { opacity: 0.6, zIndex: 3 }
            : { opacity: 0, display: "none" }
        }
        initial={{ opacity: 0 }}
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
      />
      <AnimatePresence initial={false}>
        {isTglClicked && (
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
            <div ref={ref} className="h-110 p-5 gap-3 flex flex-col">
              <div className="mb-2 flex justify-end">
                <FaTimes className="w-6 cursor-pointer" onClick={handleClose} />
              </div>
              <h2 className="mb-3 text-xl font-bold">Atur Tanggal</h2>
              <hr className="pb-3 " />
              <div className="flex flex-col items-center w-full gap-4">
                <DateRange
                  onChange={(item) => setRange([item.selection])}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={range}
                  months={1}
                  direction="horizontal"
                  className="calendarElement"
                />
                <div className="flex w-full justify-between ">
                  <div className="flex flex-col">
                    <span className="text-xs text-black">Check-In</span>
                    <h4 className="text-black font-medium">
                      {format(startDate, "dd MMM yyyy")}
                    </h4>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-black">Check-Out</span>
                    {endDate != undefined && endDate != startDate ? (
                      <h4 className="text-black font-medium">
                        {format(endDate, "dd MMM yyyy")}
                      </h4>
                    ) : (
                      <h4 className="text-primary font-medium">
                        Pilih Tanggal
                      </h4>
                    )}
                  </div>
                </div>

                {numberOfNight != 0 ? (
                  <button
                    onClick={handleSubmit}
                    className="p-3 mt-3 rounded-lg w-full bg-primary text-white"
                  >
                    Selesai ({numberOfNight} malam)
                  </button>
                ) : (
                  <button
                    disabled
                    className="p-3 mt-3 rounded-lg w-full bg-gray-300 text-miniText"
                  >
                    Selesai
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BotSheetUbahTgl;
