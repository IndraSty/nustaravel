import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Accordion = ({ title, answer }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="py-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full items-center"
      >
        <span className="font-semibold">{title}</span>
        {accordionOpen ? (<FaChevronUp className="text-sm"/>) 
        : (<FaChevronDown className="text-sm"/>)}
      </button>
      <div
        className={`grid overflow-hidden py-2 transition-all duration-500 
        ease-in-out text-miniText text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
      <hr className="mt-1"/>
    </div>
  );
};

export default Accordion;
