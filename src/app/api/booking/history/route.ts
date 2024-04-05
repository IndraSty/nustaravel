import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      const result = await prisma.bookinghistory.findMany({
        where: {
          user_id: user.id,
        },
        select: {
          bookings: {
            select: {
              id: true,
              check_in_date: true,
              check_out_date: true,
              booking_date: true,
              hotels: {
                select: {
                  hotel_name: true,
                },
              },
              rooms: {
                select: {
                  type: true,
                },
              },
              payments: {
                select: {
                  amount: true,
                },
              },
            },
          },
          status: true
        },
      });

      return NextResponse.json(
        { message: "Get All History Success", result },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ error: "User Is Not Found" }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errors: "Terjadi Kesalahan Saat Melakukan Get Booking History" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const bookingId = req.nextUrl.searchParams.get("booking_id");
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });

    const result = await prisma.bookinghistory.create({
      data: {
        booking_id: bookingId,
        status: "Menunggu Check-in",
        user_id: user?.id,
      },
    });
    return NextResponse.json(
      { message: "Add History Success", result },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { errors: "Terjadi Kesalahan Saat Menambahkan History Booking" },
      { status: 500 }
    );
  }
}
