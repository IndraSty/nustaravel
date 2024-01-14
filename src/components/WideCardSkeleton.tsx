import React from "react";

function WideCardSkeleton() {
  return (
    <div className="flex flex-col min-w-full h-[20rem] rounded-lg shadow-md">
      <div className="flex gap-1 overflow-hidden">
        <div className="w-full py-14 rounded-tl-lg bg-gray-100" />
        <div className="w-full py-14 bg-gray-100 rounded-tl-lg" />
      </div>

      <div className="px-3">
        <div className="w-full bg-gray-100 rounded-md py-3 gap-3 mt-3" />
        <div className="w-1/2 bg-gray-100 py-2 rounded-md gap-3 mt-3" />
      </div>

      <div className="flex flex-col w-full items-end px-3 py-3 gap-3">
        <div className="py-3 bg-gray-100 rounded-md right-0 w-1/2" />
        <div className="py-2 bg-gray-100 rounded-md right-0 w-1/3" />
        <div className="py-2 bg-gray-100 rounded-md right-0 w-1/3" />
        <div className="py-2 bg-gray-100 rounded-md right-0 w-1/2" />
      </div>
    </div>
  );
}

export default WideCardSkeleton;
