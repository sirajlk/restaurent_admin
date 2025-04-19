'use client'

import { Store } from '@/types-d'
import React, { useState } from 'react'
import Heading from './Heading'
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

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Store name should be at least 3 characters" }),
});
const SettingsForm = ({initialData}: SettingsFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const onSubmit= async (values: z.infer<typeof formSchema>) => {
    try{
      setIsLoading(true)
      const response = await axios.patch(`/api/stores/${params.storeId}`, values)
      toast.success('Store Created')
      router.refresh()
    } catch(error){
      toast.error('something went wrong')
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  const onDelete = async() => {
    try{
      setIsLoading(true)
      const response = await axios.delete(`/api/stores/${params.storeId}`)
      toast.success('Store Removed')
      router.refresh()
      router.push('/')
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
        <Heading title='Settings' description='Menage Store Preferences' />
        <Button variant='destructive' size='icon' onClick={() => setOpen(true)}>
          <Trash className='h-4 w-4' />
        </Button>
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
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Your store name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              </div>
              <Button disabled={isLoading} type="submit" size='sm'>Save Changes</Button>
            </form>
          </Form>
          <Separator />
          <ApiAlert 
            title='NEXT_PUBLIC_API_URL' 
            description={`${origin}/api/${params.storeId}`} 
            variant='public' 
          />
    </>
  )
}

export default SettingsForm
