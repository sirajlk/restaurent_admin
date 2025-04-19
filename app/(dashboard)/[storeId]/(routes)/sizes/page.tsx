import React from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Size } from '@/types-d'
import { db } from '@/lib/firebase'
import {format} from 'date-fns'
import { SizeColumns } from './components/columns'
import SizesClient from './components/client'
const SizesPage = async({params}: {params: {storeId: string}}) => {
  
  const sizesData = (
    await getDocs(collection(doc(db, 'stores', params.storeId), 'sizes'))
  ).docs.map((doc) => doc.data()) as Size[]

  const formattedSizes: SizeColumns[] = sizesData.map(
    (item) => ({
      id: item.id,
      value: item.value,
      name: item.name,
      createdAt: item.createdAt
        ? format(item.createdAt.toDate(), 'MMM , dd , yyyy')
        : ''
    })
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  )
}

export default SizesPage
