import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from '@/lib/auth'
import { PropertyValidator } from "@/lib/validators/property";
import { db } from "@/lib/db";

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
        const { title, description, price} = PropertyValidator.parse(body);

        const createProperty = await db.property.create({
           data:{
            title,
            description,
            price,
            user: {connect: {
                email: session?.user?.email
            }}
           }
        })
        return NextResponse.json({
            createProperty
        })
    }catch(error){
        message: "something went wrong"
    }
}