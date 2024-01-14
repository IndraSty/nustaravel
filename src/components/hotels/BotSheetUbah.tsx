import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCalendarDay, FaDoorOpen, FaUser } from "react-icons/fa";
import { getTodayAndTomorrow } from "@/lib/utils/dateUtils";
import BotSheetCountRoom from "./BotSheetCountRoom";
import { useOutsideAlerter } from "@/lib/utils/useOutsideAlerter";
import BotSheetUbahTgl from "./BotSheetUbahTgl";
import { addDays, format } from "date-fns";

function BotSheetUbah({
  isUbahClicked,
  setIsUbahClicked,
  ref,
  setKamar,
  setTamu,
  CIandCO,
  setCIandCO,
}: any) {
  const [kamarTamuClicked, setKamarTamuClicked] = useState(false);
  const [isTglClicked, setIsTglClicked] = useState(false);
  const [tempKamar, setTempKamar] = useState(1);
  const [tempTamu, setTempTamu] = useState(1);
  const bottomSheetRef = useRef(null);
  const [tempCIandCO, setTempCIandCO] = useState([...CIandCO]);
  useOutsideAlerter(bottomSheetRef, setIsUbahClicked);

  const handleCloseClick = () => {
    setIsUbahClicked(false);
    setKamarTamuClicked(false);
  };

  const handleCloseTgl = () => {
    setIsTglClicked(false);
    setIsUbahClicked(true);
  };

  const handleClickTgl = () => {
    setIsUbahClicked(false);
    setIsTglClicked(true);
  };

  const handleKamarTamuClicked = () => {
    setIsUbahClicked(false);
    setKamarTamuClicked(true);
  };

  const handleSubmit = () => {
    setKamar(tempKamar);
    setTamu(tempTamu);
    setTempCIandCO(CIandCO);
    setCIandCO(tempCIandCO);
    setIsUbahClicked(false);
    setKamarTamuClicked(false);
  };
  return (
    <div className="z-[46]">
      <BotSheetCountRoom
        isTamuClicked={kamarTamuClicked}
        setIsTamuClicked={setKamarTamuClicked}
        ref={bottomSheetRef}
        setUbah={setIsUbahClicked}
        setTempKamar={setTempKamar}
        setTempTamu={setTempTamu}
      />
      <BotSheetUbahTgl
        isTglClicked={isTglClicked}
        ref={bottomSheetRef}
        handleClose={handleCloseTgl}
        setIsTglClicked={setIsTglClicked}
        setUbah={setIsUbahClicked}
        setTempCIandCO={setTempCIandCO}
        tempCIandCO={tempCIandCO}
      />
      <motion.div
        animate={
          isUbahClicked
            ? { opacity: 0.6, zIndex: 3 }
            : { opacity: 0, display: "none" }
        }
        initial={{ opacity: 0 }}
        className="fixed top-0 bottom-0 right-0 left-0 h-full w-screen bg-black"
      />
      <AnimatePresence initial={false}>
        {isUbahClicked && (
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
            <div ref={ref} className="h-110 p-4 gap-3 flex flex-col">
              <div className="mb-2 flex justify-end">
                <FaTimes
                  className="w-6 cursor-pointer"
                  onClick={handleCloseClick}
                />
              </div>
              <h2 className="mb-3 text-xl font-bold">Ubah Pesanan</h2>
              <hr className="pb-5 " />
              <div className="p-3 flex justify-between rounded-md bg-blue-50 w-full">
                <div className="flex items-center gap-3">
                  <button onClick={handleClickTgl}>
                    <FaCalendarDay className="text-miniText" />
                  </button>
                  <span className="text-sm text-black font-medium">
                    {format(tempCIandCO[0], "dd MMM")} -{" "}
                    {format(tempCIandCO[1], "dd MMM")}
                  </span>
                </div>
                <div className="flex gap-3 items-center">
                  |
                  <button
                    onClick={handleKamarTamuClicked}
                    className="flex items-center gap-1"
                  >
                    <FaDoorOpen className="text-miniText" />
                    <span>{tempKamar}</span>
                  </button>
                  <button
                    onClick={handleKamarTamuClicked}
                    className="flex items-center gap-1"
                  >
                    <FaUser className="text-miniText" />
                    <span>{tempTamu}</span>
                  </button>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="p-3 rounded-lg w-full bg-primary text-white"
              >
                Simpan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BotSheetUbah;
