'use client'

import { Billboards, Store } from '@/types-d'
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
import { ApiAlert } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'
import Heading from '../../../settings/components/Heading'
import ImageUpload from '@/components/ui/ImageUpload'
import { storage } from '@/lib/firebase'
import { deleteObject, ref } from 'firebase/storage'

interface BillboardFormProps {
    initialData: Billboards
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});
const BillboardForm = ({initialData}: BillboardFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()


  const title = initialData ? 'Edit Billboard' : 'Create Billboard'
  const description = initialData ? 'Edit Billboard' : 'Add new Billboard'
  const toastMessage = initialData ? 'Billboard Updated' : 'Billboard Created'
  const action = initialData ? 'Save Changes' : 'Create Billboard'


  const onSubmit= async (values: z.infer<typeof formSchema>) => {
    try{
      setIsLoading(true)
      if(initialData) {
        await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, values)
      } else {
       await axios.post(`/api/${params.storeId}/billboards`, values)
      }
      toast.success(toastMessage)
      router.push(`/${params.storeId}/billboards`)
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
      const {imageUrl} = form.getValues() 
      await deleteObject(ref(storage, imageUrl)).then(async () => {
         await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)
      } )
      toast.success('Billboard Removed')
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
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

              <FormField 
                control={form.control}
                name='imageUrl'
                render={({field}) => (
                    <FormItem>
                      <FormLabel>Billboard Image</FormLabel>
                      <FormControl>
                        <ImageUpload 
                          value={field.value ? [field.value] : []}
                          disabled={isLoading}
                          onChange={(url) => field.onChange(url)}
                          onRemove={() => field.onChange('')}
                     />
                      </FormControl>
                    </FormItem>
                )}
              />

              <div className='grid grid-cols-3 gap-8'>
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Your billboard name..." {...field} />
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

export default BillboardForm
