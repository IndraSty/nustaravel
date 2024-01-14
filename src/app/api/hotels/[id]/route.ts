import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("hotels/").pop();
    const checkIdHotel = await prisma.hotels.count({
      where: {
        id: id,
      },
    });

    if (checkIdHotel != 0) {
      const hotel = await prisma.hotels.findUnique({
        where: {
          id: id,
        },
        include: {
          hotelimages: {
            select: {
              image_path: true,
            },
          },
          hotelfacilities: {
            select: {
              facilities: {
                select: {
                  name: true,
                  icon: true,
                },
              },
            },
          },
          reviews: {
            select: {
              text: true,
              users: {
                select: {
                  fullname: true
                }
              }
            }
          }
        },
      });
      return NextResponse.json({
        message: "GET Data Hotels Success",
        status: 200,
        result: hotel,
      });
    } else {
      return NextResponse.json({
        message: "Hotel Is Not Found!",
        status: 404,
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
