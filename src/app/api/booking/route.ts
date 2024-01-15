import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const roomId = req.nextUrl.searchParams.get("room_id");
  const data = await req.json();
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      const room = await prisma.rooms.findUnique({
        where: {
          id: roomId,
        },
        select: {
          id: true,
          hotel_id: true,
        },
      });

      const result = await prisma.bookings.create({
        data: {
          room_id: room?.id,
          hotel_id: room?.hotel_id,
          user_id: user.id,
          status: "Waiting for Payment",
          check_in_date: data.checkIn,
          check_out_date: data.checkOut,
        },
      });
      return NextResponse.json(
        { message: "Add Booking Success", result },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Add Booking Failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errors: "Terjadi Kesalahan Saat Menambah Booking Hotel" },
      { status: 500 }
    );
  }
}
