'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import {  CategoriesColumns, categoryColumns} from './columns'
import ApiList from '@/components/api-list'

interface CategoryClientProps{
  data: CategoriesColumns[]
}
const CategoryClient = ({data}: CategoryClientProps) => {

    const params = useParams()
    const router = useRouter()
  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Categories (${data?.length})`}
         description='Manage categories for your client'
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/create`)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New
        </Button>
     </div>

     <Separator />

     <DataTable searchKey='name' columns={categoryColumns} data={data} />
 
     <Heading title='API' description='API calls for categories' />
     <Separator />
     <ApiList entityName='categories' entityNameId='categoryId' />
   </>
  )
}

export default CategoryClient
