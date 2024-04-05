import { prisma } from "@/lib/database/init";
import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    const req = await request.json()
    const serverKey = process.env.NEXT_PUBLIC_SECRET;
    const hashed = crypto.createHash('sha512').update(req.order_id + req.status_code + req.gross_amount + serverKey).digest('hex');
    if(hashed == req.signature_key){
        if(req.transaction_status == 'settlement'){
            const order = await prisma.bookings.findUnique({
                where: {
                    id: req.order_id,
                },
            });
            if (order) {
                await prisma.bookings.update({
                    where: {
                        id: req.order_id,
                    },
                    data: {
                        status: 'Paid',
                    },
                });

                const payment = await prisma.payments.findFirst({
                    where: {
                        booking_id: req.order_id,
                        status: 'Paid'
                    }
                })

                await prisma.payments.update({
                    where: {
                        id: payment?.id,
                    },
                    data: {
                        method: req.payment_type
                    }
                })

                return NextResponse.json({message: "Update Bookings, Payments and Create Booking History Success Success"}, {status: 200})
            } else {
                return NextResponse.json({error: "Update Bookings and Payments Failed because booking_id not found"}, {status: 404})
            }
        }
        return NextResponse.json({message: "Update Bookings and Payments Success"}, {status: 200})
    } else {
        return NextResponse.json({error: "Invalid signature key"}, {status: 400})
    }
}
