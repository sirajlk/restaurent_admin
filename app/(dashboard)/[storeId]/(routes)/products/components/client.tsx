'use client'
import React from 'react'
import Heading from '../../settings/components/Heading'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { DataTable } from '@/components/ui/data-table'
import { ProductsColumns, theProductColumns } from './columns'
import ApiList from '@/components/api-list'

interface ProductsClientProps{
  data: ProductsColumns[]
}
const ProductsClient = ({data}: ProductsClientProps) => {

    const params = useParams()
    const router = useRouter()
  return (
   <>
     <div className='flex items-center justify-between '>
        <Heading 
         title={`Products (${data?.length})`}
         description='Manage products for your client'
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/create`)}>
            <Plus className='h-4 w-4 mr-2' />
            Add New
        </Button>
     </div>

     <Separator />

     <DataTable searchKey='name' columns={theProductColumns} data={data} />
 
     <Heading title='API' description='API calls for products' />
     <Separator />
     <ApiList entityName='products' entityNameId='productId' />
   </>
  )
}

export default ProductsClient
