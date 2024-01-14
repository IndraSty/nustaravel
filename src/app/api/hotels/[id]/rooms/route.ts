import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathArray = req.nextUrl.pathname.split("/");
    const hotelId = pathArray[pathArray.length - 2]
    const checkIdHotel = await prisma.rooms.count({
      where: {
        hotel_id: hotelId,
      },
    });
    if (checkIdHotel != 0) {
      const rooms = await prisma.rooms.findMany({
        where: {
          hotel_id: hotelId
        }
      });
      return NextResponse.json({
        status: 200,
        message: "GET Rooms Hotel Success",
        result: rooms,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: "Hotel Tidak Tersedia",
      });
    }
  } catch (error) {
    console.log(error);
    NextResponse.json(
      { errors: "Terjadi Kesalahan Saat Mengambil Data Hotel" },
      { status: 500 }
    );
  }
}
