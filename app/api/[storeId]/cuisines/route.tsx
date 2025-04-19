import { db } from "@/lib/firebase"
import { Cuisine} from "@/types-d"
import { auth } from "@clerk/nextjs/server"
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"


export const POST = async(req: Request,
    {params}: {params: {storeId: string}}
) => {
    try{

        const {userId} = auth()
        const body = await req.json()

        if(!userId){
            return new NextResponse('Un_Authorized', {status: 400})
        }

        const {name, value} = body
        if(!name){
            return new NextResponse('Cuisine name is missing', {status:400})
        }

        if(!value){
            return new NextResponse('Cuisine value is missing', {status:400})
        }

        if(!params.storeId){
            return new NextResponse('Store ID is missing', {status:400})
        }

        const store = await getDoc(doc(db, 'stores', params.storeId))

        if(store.exists()){
            let storeData = store.data()
            if(storeData = store.data())
                if(storeData?.userId !== userId){
                    return new NextResponse('Un-Authorized Access', {status: 500})
                }
        }

        const cuisineData = {
            name,
            value,
            createdAt : serverTimestamp()
        }

        const cuisineRef = await addDoc(
            collection(db, 'stores', params.storeId, 'cuisines'),
            cuisineData
        )

        const id = cuisineRef.id

        await updateDoc(doc(db, 'stores', params.storeId, 'cuisines', id), {
            ...cuisineData,
            id,
            updatedAt: serverTimestamp()
        })

        return NextResponse.json({id, ...cuisineData})
    } catch(error){
        console.log(`CUISINES_POST:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}

export const GET = async(req: Request,
    {params}: {params: {storeId: string}}
) => {
    try{
        if(!params.storeId){
            return new NextResponse('Store ID is missing', {status:400})
        }

        const cuisineData = (
            await getDocs(collection(doc(db, 'stores', params.storeId), 'cuisines'))
        ).docs.map((doc) => doc.data()) as Cuisine[]

        return NextResponse.json(cuisineData)
    } catch(error){
        console.log(`CUISINES_GET:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}