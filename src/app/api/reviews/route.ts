import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { ReviewValidator } from "@/lib/validators/review";
import { NextApiRequest } from "next";
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
        const body = req.json()
        const { rating, comment, propertyId } = ReviewValidator.parse(body);
        //@ts-ignore
        const createReview = await db.review.create({
            data: {
                rating,
                comment,
                property: { connect: { id: propertyId } },
                user: { connect: { email: session?.user?.email } },
            }
        })
        return NextResponse.json({
            createReview
        },{
            status: 200
        })
    } catch(e){
        return NextResponse.json({
            message: "something went wrong"
        },{
            status: 409
        })
    }
}