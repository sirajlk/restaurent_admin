import { db } from "@/lib/firebase"
import { Order, order } from "@/types-d"
import { collection, doc, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server"


export const GET = async(req: Request,
    {params}: {params: {storeId: string}}
) => {
    try{
        if(!params.storeId){
            return new NextResponse('Store ID is missing', {status:400})
        }

        const orderData = (
            await getDocs(collection(doc(db, 'stores', params.storeId), 'orders'))
        ).docs.map((doc) => doc.data()) as Order[]

        return NextResponse.json(orderData)
    } catch(error){
        console.log(`ORDERS_GET:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}