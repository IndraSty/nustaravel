import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathArray = req.nextUrl.pathname.split("/");
    const hotelId = pathArray[pathArray.length - 3];
    const roomId = pathArray[pathArray.length - 1];
    const checkIdHotel = await prisma.rooms.count({
      where: {
        hotel_id: hotelId,
      },
    });
    if (checkIdHotel != 0) {
      const checkIdRoom = await prisma.rooms.count({
        where: {
          id: roomId,
          hotel_id: hotelId
        },
      });
      if (checkIdRoom != 0) {
        const rooms = await prisma.rooms.findUnique({
            where: {
                id: roomId,
            },
            include: {
              hotels: {
                select: {
                  hotel_name: true
                }
              }
            }
        });
        return NextResponse.json({
          status: 200,
          message: "GET Room Hotel Success",
          result: rooms,
        });
      } else {
        return NextResponse.json({
            status: 404,
            message: "Room id is Not Found in this Hotel",
          });
      }
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
