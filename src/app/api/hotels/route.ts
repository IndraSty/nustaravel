import { prisma } from "@/lib/database/init";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function GET(req: NextApiRequest) {
  try {
    const searchQuery = req.query?.search || '';

    const hotels = await prisma.hotels.findMany({
      where: {
        hotel_name: {
          contains: searchQuery, // case-insensitive
        },
      },
      include: {
        hotelimages: {
          select: {
            image_path: true
          }
        },
      }
    });

    return NextResponse.json({
      message: "GET Data Hotels Success",
      status: 200,
      result: hotels,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({errors: "Cannot GET Data Hotels"})
  }
}
