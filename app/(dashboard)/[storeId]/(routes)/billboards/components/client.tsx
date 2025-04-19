'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { BillboardColumns, columns } from './columns'
import ApiList from '@/components/api-list'

interface BillboardClientProps{
  data: BillboardColumns[]
}
const BillboardClient = ({data}: BillboardClientProps) => {

    const params = useParams()
    const router = useRouter()
  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Billboards (${data?.length})`}
         description='Manage billboards for your client'
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/create`)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New
        </Button>
     </div>

     <Separator />

     <DataTable searchKey='label' columns={columns} data={data} />
     <Heading title='API' description='API calls for billboard' />
     <Separator />
     <ApiList entityName='billboards' entityNameId='billboardId' />

   </>
  )
}

export default BillboardClient
