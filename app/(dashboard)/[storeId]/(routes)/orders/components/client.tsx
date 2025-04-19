'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { OrdersColumns, theOrdersColumns } from './columns'
import ApiList from '@/components/api-list'

interface OrdersClientProps{
  data: OrdersColumns[]
}
const OrdersClient = ({data}: OrdersClientProps) => {

    const params = useParams()
    const router = useRouter()

  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Orders (${data?.length})`}
         description='Manage orders for your client'
        />
     </div>

     <Separator />

     <DataTable searchKey='products' columns={theOrdersColumns} data={data} />
   </>
  )
}

export default OrdersClient
