
function CardSkeleton() {
  return (
    <>
      <div className="w-full h-full">
        <div className="rounded-t-lg object-cover py-14 bg-gray-100" />
        <div className="flex flex-col w-full py-2 gap-2">
         <div className="w-full py-2 bg-gray-100"></div>
         <div className="w-1/2 py-2 bg-gray-100"></div>
         <div className="w-full py-2 bg-gray-100"></div>
        </div>
      </div>
    </>
  );
}

export default CardSkeleton;
