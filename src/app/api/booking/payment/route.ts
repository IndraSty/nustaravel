import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const bookingId = req.nextUrl.searchParams.get("booking_id");
  const data = req.json();

  try {
    const booking = await prisma.bookings.findUnique({
      where: {
        id: bookingId,
      },
      select: {
        id: true,
      },
    });

    if (booking) {
      const payment = await prisma.payments.create({
        data: data,
      });

      return NextResponse.json(
        { message: "Add Booking Success", payment },
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
      { errors: "Terjadi Kesalahan Saat Melakukan Payment Hotel" },
      { status: 500 }
    );
  }
}
