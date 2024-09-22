import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest){
    const { location, minPrice, maxPrice, startDate, endDate } = req.query;
    const properties = await db.property.findMany({
        where: {
          AND: [
            { price: { gte: parseFloat(minPrice as string), lte: parseFloat(maxPrice as string) } },
            {
              bookings: {
                none: {
                  AND: [
                    { startDate: { lte: new Date(endDate as string) } },
                    { endDate: { gte: new Date(startDate as string) } },
                  ],
                },
              },
            },
          ],
        },
      });
  
      return NextResponse.json(properties, {
        status: 200
      });
}