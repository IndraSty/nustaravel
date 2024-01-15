import Midtrans from "midtrans-client"
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST(request) {
    const { id, amount, name, hotelName, quantity, custName, email, phone } = await request.json()
    let parameter = {
        item_details: {
            name: name,
            hotel_name: hotelName,
            price: amount,
            quantity: quantity
        },
        transaction_details: {
            order_id: id,
            gross_amount: amount,
        },
        customer_details: {
            first_name: custName,
            email: email,
            phone: phone
        }
    }

    const token = await snap.createTransactionToken(parameter)
    console.log(token)
    return NextResponse.json({ token })
}