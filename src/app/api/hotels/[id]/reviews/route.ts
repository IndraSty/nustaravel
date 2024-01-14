import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const pathArray = req.nextUrl.pathname.split("/");
    const hotelId = pathArray[pathArray.length - 2];
    const checkHotelId = await prisma.reviews.count({
      where: {
        hotel_id: hotelId,
      },
    });

    if (checkHotelId != 0) {
      const reviews = await prisma.reviews.findMany({
        where: {
          hotel_id: hotelId,
        },
        select: {
            users: {
                select: {
                    fullname: true
                }
            },
            rating: true,
            text: true
        }
      });
      return NextResponse.json({
        message: "Get Hotels Reviews Success",
        result: reviews,
      });
    } else {
      return NextResponse.json({ message: "Nothing Review in This Hotel" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errors: "Terjadi Kesalahan Saat Mengambil Data Review Hotel" },
      { status: 500 }
    );
  }
}
