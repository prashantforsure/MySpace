import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingValidator } from "@/lib/validators/booking";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{
        const session = await getAuthSession();
        if(!session || !session?.user?.email){
            return NextResponse.json({
                message: "user is unauthorized"
            },{
                status: 403
            }
        )
        }
        const body = await req.json();
        const { startDate, endDate, propertyId } = BookingValidator.parse(body);
        const createBooking = await db.booking.create({
          data: {
            startDate,
            endDate,
            property: { connect: { id: propertyId } },
            user: { connect: { email: session?.user?.email } },
          }
        })
    }
}