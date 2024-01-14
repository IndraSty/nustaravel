import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
  const phoneNumber = process.env.PHONE_NUMBER;
  const client = twilio(accountSid, authToken);
  const req = await request.json(); // mendapatkan OTP dari body permintaan
  const otpCode = req.otp;
  console.log(otpCode)
  try {
    const verification_check = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phoneNumber, code: otpCode });
    console.log(verification_check.status);
    if (verification_check.status == "approved") {
      return NextResponse.json({ message: "OTP verified", status: "approved" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" });
  }
}
