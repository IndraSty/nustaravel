import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(request: NextRequest) {
    const accountSid = process.env.TWILIO_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID;
    const client = twilio(accountSid, authToken);
    const req = await request.json()
    const phoneNumber = req.phone;

    try {
      const verification = await client.verify.v2
        .services(verifySid)
        .verifications.create({ to: phoneNumber, channel: "sms" });
      console.log(verification.status);
      return NextResponse.json({ message: "OTP sent" });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: "An error occurred" });
    }
  }

// async function name(params:type) {
  // const readlineE = readline.createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //   });

  //   readlineE.question("Please enter the OTP:", async (otpCode) => {
  //     const verification_check = await client.verify.v2
  //       .services(verifySid)
  //       .verificationChecks.create({ to: "+6281298874341", code: otpCode });
  //     console.log(verification_check.status);
  //     readlineE.close();
  //   });
// }
