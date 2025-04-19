import React from 'react'
import { collection, doc, getDocs } from 'firebase/firestore'
import { Product, Size } from '@/types-d'
import { db } from '@/lib/firebase'
import {format} from 'date-fns'
import { ProductsColumns } from './components/columns'
import ProductsClient from './components/client'
import { formatter } from '@/lib/utils'
const ProductsPage = async({params}: {params: {storeId: string}}) => {
  
  const productsData = (
    await getDocs(collection(doc(db, 'stores', params.storeId), 'products'))
  ).docs.map((doc) => doc.data()) as Product[]

  const formattedProducts: ProductsColumns[] = productsData.map(
    (item) => ({
      id: item.id,
      name: item.name,
      images: item.images,
      price : formatter.format(item.price),
      isFeatured: item.isFeatured,
      isArchived: item.isArchived,
      category: item.category,
      size: item.size,
      kitchen: item.kitchen,
      cuisine: item.cuisine,
      createdAt: item.createdAt
        ? format(item.createdAt.toDate(), 'MMM , dd , yyyy')
        : ''
    })
  )

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  )
}

export default ProductsPage
