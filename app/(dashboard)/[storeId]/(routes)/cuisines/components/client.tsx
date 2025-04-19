'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import {  CuisineColumns, theCuisineColumns } from './columns'
import ApiList from '@/components/api-list'

interface CuisineClientProps{
  data: CuisineColumns[]
}
const CuisineClient = ({data}: CuisineClientProps) => {

    const params = useParams()
    const router = useRouter()
  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Cuisines (${data?.length})`}
         description='Manage cuisines for your client'
        />
        <Button onClick={() => router.push(`/${params.storeId}/cuisines/create`)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New
        </Button>
     </div>

     <Separator />

     <DataTable searchKey='name' columns={theCuisineColumns} data={data} />
 
     <Heading title='API' description='API calls for cuisines' />
     <Separator />
     <ApiList entityName='cuisines' entityNameId='cuisineId' />
   </>
  )
}

export default CuisineClient
