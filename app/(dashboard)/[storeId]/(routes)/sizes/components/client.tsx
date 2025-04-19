'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { SizeColumns, sizesColumns } from './columns'
import ApiList from '@/components/api-list'

interface SizesClientProps{
  data: SizeColumns[]
}
const SizesClient = ({data}: SizesClientProps) => {

    const params = useParams()
    const router = useRouter()
  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Sizes (${data?.length})`}
         description='Manage sizes for your client'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/create`)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New
        </Button>
     </div>

     <Separator />

     <DataTable searchKey='name' columns={sizesColumns} data={data} />
 
     <Heading title='API' description='API calls for sizes' />
     <Separator />
     <ApiList entityName='sizes' entityNameId='sizeId' />
   </>
  )
}

export default SizesClient
