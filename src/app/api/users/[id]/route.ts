import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserValidator } from "@/lib/validators/user";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest ){
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
        const { id } = req.query;
        const user = await db.user.findUnique({
            where: {
                id: Number(id)
            }
        })
        return NextResponse.json({
            user
        },{
            status: 200
        })
    }catch(e){
        return NextResponse.json({
            message: "something went wrong"
        },{
            status: 409
        })
    }
}

export async function UPDATE(req: NextRequest){
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
        const { id } = req.query;
        const body = await req.json();
        const { name, image } = UserValidator.parse(body)
       
        const updateUser = await db.user.update({
            where: {
                id: Number(id)
            }, 
             data: {
                name,
                image,
            }
        })
        return NextResponse.json({
            updateUser
        },{
            status: 200
        })
    }catch(e){
        return NextResponse.json({
            message: "something went wrong"
        },{
            status: 409
        })
    }
}