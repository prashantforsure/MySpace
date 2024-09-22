import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest){
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
        const { propertyId } = req.body;

const favorite = await db.favorite.create({
      data: {
        user: { connect: { email: session.user.email } },
        property: { connect: { id: propertyId } },
      },
    });

    return NextResponse.json(favorite);

}catch(error){
    
}
}