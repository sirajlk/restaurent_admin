import React from 'react'
import BillboardClient from './components/client'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Billboards } from '@/types-d'
import { db } from '@/lib/firebase'
import {format} from 'date-fns'
import { BillboardColumns } from './components/columns'
const BillboardsPage = async({params}: {params: {storeId: string}}) => {
  
  const billboardsData = (
    await getDocs(collection(doc(db, 'stores', params.storeId), 'billboards'))
  ).docs.map((doc) => doc.data()) as Billboards[]

  const formattedBillboard: BillboardColumns[] = billboardsData.map(
    (item) => ({
      id: item.id,
      label: item.label,
      imageUrl: item.imageUrl,
      createdAt: item.createdAt
        ? format(item.createdAt.toDate(), 'MMM , dd , yyyy')
        : ''
    })
  )
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  )
}

export default BillboardsPage
