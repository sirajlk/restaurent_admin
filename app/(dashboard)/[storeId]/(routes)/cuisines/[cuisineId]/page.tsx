import { db } from '@/lib/firebase'
import {  doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { Cuisine, Kitchen } from '@/types-d'
import KitchenForm from './components/CuisineForm'
import CuisineForm from './components/CuisineForm'

const CuisinePage = async({
  params
} : {
  params: {
    cuisineId: string,
    storeId: string
  }
}) => {

  const cuisine = (
    await getDoc(doc(db, 'stores', params.storeId, 'cuisines', params.cuisineId))
  ).data() as Cuisine



  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <CuisineForm initialData={cuisine} />
      </div>
    </div>
  )
}

export default CuisinePage
