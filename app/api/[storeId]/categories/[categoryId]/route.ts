import { db } from "@/lib/firebase"
import { Billboards, Category } from "@/types-d"
import { auth } from "@clerk/nextjs/server"
import { deleteDoc, doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { NextResponse } from "next/server"

export const PATCH = async(req: Request,
    {params}: {params: {storeId: string, categoryId: string}}
) => {
    try{

        const {userId} = auth()
        const body = await req.json()

        if(!userId){
            return new NextResponse('Un_Authorized', {status: 400})
        }

        const {name, billboardId, billboardLabel} = body
        if(!name){
            return new NextResponse('Category name is missing', {status:400})
        }

        if(!billboardId){
            return new NextResponse('Category ID is missing', {status:400})
        }

        if(!billboardLabel){
            return new NextResponse('Category label is missing', {status:400})
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

        const categoryRef = await getDoc(
            doc(db, 'stores', params.storeId, 'categories', params.categoryId)
        )

        if(categoryRef.exists()){
            await updateDoc(
                doc(db, 'stores', params.storeId, 'categories', params.categoryId), {
                    ...categoryRef.data(),
                    name,
                    billboardLabel,
                    billboardId,
                    updatedAt: serverTimestamp()
                }
            )
        } else {
            return new NextResponse('Category not found', {status: 404})
        }

        const category = (
            await getDoc(
                doc(db, 'stores', params.storeId, 'categories', params.categoryId)
            )
        ).data() as Category


        return NextResponse.json(category)
    } catch(error){
        console.log(`CATEGORY_PATCH:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}


export const DELETE = async(req: Request,
    {params}: {params: {storeId: string, categoryId: string}}
) => {
    try{

        const {userId} = auth()

        if(!params.storeId){
            return new NextResponse('Store ID is missing', {status:400})
        }

        if(!params.categoryId){
            return new NextResponse('Category ID is missing', {status:400})
        }

        const store = await getDoc(doc(db, 'stores', params.storeId))

        if(store.exists()){
            let storeData = store.data()
            if(storeData = store.data())
                if(storeData?.userId !== userId){
                    return new NextResponse('Un-Authorized Access', {status: 500})
                }
        }

        const categoryRef = doc(db, 'stores', params.storeId, 'categories', params.categoryId)

        await deleteDoc(categoryRef)

      

        return NextResponse.json({msg: 'Category deleted'})
    } catch(error){
        console.log(`CATEGORY_DELETE:${error}`)
        return new NextResponse('Internet Server Error', {status:500})
    }
}