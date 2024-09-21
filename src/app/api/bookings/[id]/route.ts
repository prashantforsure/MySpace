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
        const { startDate, endDate } = BookingValidator.parse(body);

        const bookingPut = await db.booking.update({
            where: {
                id: Number(id)
            }, data: {
                startDate,
                endDate
            }
        })
        return NextResponse.json({
            bookingPut
        },{
            status: 200
        })
    }catch(e){
        return NextResponse.json({
            message: "something went wrong"
        },{
            status: 409
        }
    )
    }
}

export async function DELETE(req: NextApiRequest){
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
      
        const { id } = req.query
        const deleteBooking = await db.booking.delete({
            where: {
                id: Number(id)
            }
        })
        
        return NextResponse.json({
            deleteBooking
        },{
            status: 200
        })
    }catch(e){
        return NextResponse.json({
            message: "something went wrong"
        },{
            status: 409
        }
    )
    }
}