
import React from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Category } from '@/types-d'
import { db } from '@/lib/firebase'
import {format} from 'date-fns'
import { CategoriesColumns } from './components/columns'
import CategoryClient from './components/client'
const CategoriesPage = async({params}: {params: {storeId: string}}) => {
  
  const categoriesData = (
    await getDocs(collection(doc(db, 'stores', params.storeId), 'categories'))
  ).docs.map((doc) => doc.data()) as Category[]

  const formattedCategories: CategoriesColumns[] = categoriesData.map(
    (item) => ({
      id: item.id,
      billboardLabel: item.billboardLabel,
      name: item.name,
      createdAt: item.createdAt
        ? format(item.createdAt.toDate(), 'MMM , dd , yyyy')
        : ''
    })
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  )
}

export default CategoriesPage
