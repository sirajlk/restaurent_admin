import Navbar from '@/components/Navbar'
import { db } from '@/lib/firebase'
import { Store } from '@/types-d'
import { auth } from '@clerk/nextjs/server'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { redirect } from 'next/navigation'
import React from 'react'

interface DashboardLyaoutProps {
    children : React.ReactNode,
    params: {storeId: string}
}

const DashboardLayout = async({children, params}: DashboardLyaoutProps) => {
    const {userId} = auth()

    if(!userId){
        redirect('/sign-in')
    }

    const storeSnap = await getDocs(
        query(
            collection(db, 'stores'),
            where("userId", "==", userId),
            where("id", "==", params.storeId)
        )
    )

    let store

    storeSnap.forEach((doc) => {
        store = doc.data() as Store
    })

    if(!store){
        redirect('/')
    }
 
    console.log(store)
    return (
    <>
       <Navbar />
       {children}
    </>
  )
}

export default DashboardLayout
