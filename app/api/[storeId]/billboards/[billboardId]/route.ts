import { db } from "@/lib/firebase"
import { Billboards } from "@/types-d"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const POST = async(req: Request,
    {params}: {params: {storeId: string, billboardId: string}}
) => {
    try{

        const {userId} = auth()
        const body = await req.json()

        if(!userId){
            return new NextResponse('Un_Authorized', {status: 400})
        }

        const {label, imageUrl} = body
        if(!label){
            return new NextResponse('Billboard name is missing', {status:400})
        }

        if(!imageUrl){
            return new NextResponse('Billboard image is missing', {status:400})
        }

        if(!params.storeId){
            return new NextResponse('Store ID is missing', {status:400})
        }

        if(!params.billboardId){
            return new NextResponse('Billboard ID is missing', {status:400})
        }

        const store = await getDoc(doc(db, 'stores', params.storeId))

        if(store.exists()){
            let storeData = store.data()
            if(storeData = store.data())
                if(storeData?.userId !== userId){
                    return new NextResponse('Un-Authorized Access', {status: 500})
                }
        }

        const billboardRef = await getDoc(
            doc(db, 'stores', params.storeId, 'billboards', params.billboardId)
        )

        if(billboardRef.exists()){
            await updateDoc(
                doc(db, 'stores', params.storeId, 'billboards', params.billboardId), {
                    ...billboardRef.data(),
                    label,
                    imageUrl,
                    updatedAt: serverTimestamp()
                }
            )
        } else {
            return new NextResponse('Billboard not found', {status: 404})
        }

        const billboard = (
            await getDoc(
                doc(db, 'stores', params.storeId, 'billboards', params.billboardId)
            )
        ).data() as Billboards


        return NextResponse.json(billboard)
    } catch(error){
        console.log(`STORES_POST:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}


export const DELETE = async(req: Request,
    {params}: {params: {storeId: string, billboardId: string}}
) => {
    try{

        const {userId} = auth()

        if(!params.storeId){
            return new NextResponse('Store ID is missing', {status:400})
        }

        if(!params.billboardId){
            return new NextResponse('Billboard ID is missing', {status:400})
        }

        const store = await getDoc(doc(db, 'stores', params.storeId))

        if(store.exists()){
            let storeData = store.data()
            if(storeData = store.data())
                if(storeData?.userId !== userId){
                    return new NextResponse('Un-Authorized Access', {status: 500})
                }
        }

        const billboardRef = doc(db, 'stores', params.storeId, 'billboards', params.billboardId)

        await deleteDoc(billboardRef)

      

        return NextResponse.json({msg: 'Billboard deleted'})
    } catch(error){
        console.log(`STORES_POST:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}