import Link from "next/link";

const CityCard = ({ kota, isGrab }) => {
  return (
    !isGrab ? (
      <Link href={kota.url} className="flex flex-col min-w-[38%] md:min-w-44 md:h-[250px] h-[220px]">
        <img
          src={kota.image}
          alt=""
          className="object-cover rounded-lg cursor-pointer w-full h-full"
        />
        <h2 className="px-1 py-2 font-semibold text-base">{kota.name}</h2>
    </Link>
    ) : (
      <div className="flex flex-col min-w-[38%] h-[220px]">
        <img
          src={kota.image}
          alt=""
          className="object-cover rounded-lg cursor-pointer w-full h-full"
        />
        <h2 className="px-1 py-2 font-semibold text-base">{kota.name}</h2>
    </div>
    )
  );
};

export default CityCard;
