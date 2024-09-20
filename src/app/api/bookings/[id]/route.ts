import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { BookingValidator } from "@/lib/validators/booking";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function PUT(req: NextApiRequest){
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
        //@ts-ignore
        const body = await req.json();
        const { id } = req.query
        const { startDate, endDate, propertyId } = BookingValidator.parse(body);

        const bookingPut = await db.booking.
    }
}