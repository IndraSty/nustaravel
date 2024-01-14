import { addPhoneNumber } from "@/lib/database/service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const req = await request.json();
  // console.log(req);
  const res = await addPhoneNumber(req);
  return NextResponse.json(
    { status: res.status, message: res.message },
    { status: res.statusCode }
  );
}
