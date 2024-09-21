import { getAuthSession } from "@/lib/auth";
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
        
    }
}