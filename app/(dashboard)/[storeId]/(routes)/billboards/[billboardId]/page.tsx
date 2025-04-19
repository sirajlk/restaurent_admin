import { db } from '@/lib/firebase'
import { Billboards } from '@/types-d'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import BillboardForm from './components/BillboardForm'

const BillboardPage = async({
  params
} : {
  params: {
    billboardId: string,
    storeId: string
  }
}) => {

  const billboard = (
    await getDoc(doc(db, 'stores', params.storeId, 'billboards', params.billboardId))
  ).data() as Billboards

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  )
}

export default BillboardPage
