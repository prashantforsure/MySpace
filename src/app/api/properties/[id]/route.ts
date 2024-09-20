import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PropertyValidator } from "@/lib/validators/property";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

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
        const { title, description, price} = PropertyValidator.parse(body);
        
        const updateProperty = await db.property.update({
            where: {
                id: Number(id)
            }, data: {
                title,
                description,
                price,
            }
        })
       return NextResponse.json({
        updateProperty
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

export async function DELETE(req: NextApiRequest){
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
    const deleteProperty = await db.property.delete({
        where: {
            id: Number(id)
        }
    })
    return  NextResponse.json({
        deleteProperty
    },{
        status: 200
    })
}