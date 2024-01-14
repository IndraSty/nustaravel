import { prisma } from "@/lib/database/init";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get('email');
    const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
    
      if (user) {
        await prisma.users.findUnique({
          where: {
            email: email,
          },
          select: {
            phone: true,
          },
        });
        return NextResponse.json({message: "Get Phone Success", phone: user.phone}, {status: 200})
      }else {
        return NextResponse.json({message: "Get Phone Failed"}, {status: 400})
      }
}