import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathArray = req.nextUrl.pathname.split("/");
    const hotelId = pathArray[pathArray.length - 2];

    const checkHotelId = await prisma.hotelfacilities.count({
      where: {
        hotel_id: hotelId,
      },
    });

    if (checkHotelId != 0) {
      const hotlFacilities = await prisma.hotelfacilities.findMany({
        where: {
          hotel_id: hotelId,
        },
        select: {
            facilities: {
                select: {
                  id: true,
                    name: true,
                    icon: true
                }
            }
        }
      });

      return NextResponse.json({
        message: "Get Hotel Facilities Success",
        result: hotlFacilities,
      });
    } else {
      return NextResponse.json({
        message: "There Are No Facilities In This Hotels",
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errors: "Terjadi Kesalahan Saat Mengambil Data Fasilitas Hotel" },
      { status: 500 }
    );
  }
}
