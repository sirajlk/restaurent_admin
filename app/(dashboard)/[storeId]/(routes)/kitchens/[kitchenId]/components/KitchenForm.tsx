'use client'

import { Kitchen } from '@/types-d'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AlertModel } from '@/components/model/alert-model'
import Heading from '../../../settings/components/Heading'

interface KitchenFormProps {
    initialData: Kitchen
}

const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});
const KitchenForm = ({ initialData }: KitchenFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()


  const title = initialData ? 'Edit Kitchen' : 'Create Kitchen'
  const description = initialData ? 'Edit Kitchen' : 'Add new Kitchen'
  const toastMessage = initialData ? 'Kitchen Updated' : 'Kitchen Created'
  const action = initialData ? 'Save Changes' : 'Create Kitchen'


  const onSubmit= async (values: z.infer<typeof formSchema>) => {
    try{
      setIsLoading(true)
     
      if(initialData) {
        await axios.patch(`/api/${params.storeId}/kitchens/${params.kitchenId}`, values)
      } else {
       await axios.post(`/api/${params.storeId}/kitchens`, values)
        
      }
      toast.success(toastMessage)
      router.push(`/${params.storeId}/kitchens`)
    } catch(error){
      toast.error('something went wrong')
      console.log(error)
    }finally{
      router.refresh()
      setIsLoading(false)
    }
  }

  const onDelete = async() => {
    try{
      setIsLoading(true)
         await axios.delete(`/api/${params.storeId}/kitchens/${params.kitchenId}`)
      toast.success('Kitchen Removed')
      router.refresh()
      router.push(`/${params.storeId}/kitchens`)
    } catch(error){
      toast.error('something went wrong')
      console.log(error)
    }finally{
      setIsLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
    <AlertModel 
     isOpen={open}
     onClose={() => setOpen(false)}
     onConfirm={onDelete}
     loading={isLoading}
    />
     <div className='flex w-full items-center justify-center'>
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={isLoading} variant='destructive' size='icon' onClick={() => setOpen(true)}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
     </div>
     <Separator />

     <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

              <div className='grid grid-cols-3 gap-8'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Your kitchen name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Your kitchen value..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            
              </div>
              <Button disabled={isLoading} type="submit" size='sm'>Save Changes</Button>
            </form>
          </Form>
    </>
  )
}

export default KitchenForm
