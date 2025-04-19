'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { KitchenColumns, theKitchenColumns } from './columns'
import ApiList from '@/components/api-list'

interface KitchenClientProps{
  data: KitchenColumns[]
}
const KitchenClient = ({data}: KitchenClientProps) => {

    const params = useParams()
    const router = useRouter()
  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Kitchens (${data?.length})`}
         description='Manage kitchens for your client'
        />
        <Button onClick={() => router.push(`/${params.storeId}/kitchens/create`)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New
        </Button>
     </div>

     <Separator />

     <DataTable searchKey='name' columns={theKitchenColumns} data={data} />
 
     <Heading title='API' description='API calls for kitchens' />
     <Separator />
     <ApiList entityName='kitchens' entityNameId='kitchenId' />
   </>
  )
}

export default KitchenClient
