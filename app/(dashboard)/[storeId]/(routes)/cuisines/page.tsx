import React from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Cuisine } from '@/types-d'
import { db } from '@/lib/firebase'
import {format} from 'date-fns'
import { CuisineColumns } from './components/columns'
import CuisineClient from './components/client'
const CuisinePage = async({params}: {params: {storeId: string}}) => {
  
  const cuisinesData = (
    await getDocs(collection(doc(db, 'stores', params.storeId), 'cuisines'))
  ).docs.map((doc) => doc.data()) as Cuisine[]

  const formattedCuisines: CuisineColumns[] = cuisinesData.map(
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
        <CuisineClient data={formattedCuisines} />
      </div>
    </div>
  )
}

export default CuisinePage
