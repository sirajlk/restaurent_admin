'use client'

import { Category, Cuisine, Kitchen, Product, Size } from '@/types-d'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import axios from 'axios'
import { AlertModel } from '@/components/model/alert-model'
import Heading from '../../../settings/components/Heading'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import ImagesUpload from '@/components/ui/ImagesUpload'

interface ProductFormProps {
    initialData: Product
    categories: Category[]
    sizes: Size[]
    kitchens: Kitchen[]
    cuisines: Cuisine[]
}

const formSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  images: z.object({url: z.string()}).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  category: z.string().min(1),
  cuisine: z.string().optional(),
  kitchen: z.string().optional(),
  size: z.string().optional(),



});
const ProductForm = ({ initialData , categories, sizes, kitchens, cuisines}: ProductFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      price: 0,
      images: [],
      isFeatured: false,
      isArchived: false,
      category: '',
      size: '',
      kitchen: '',
      cuisine: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const params = useParams()
  const router = useRouter()


  const title = initialData ? 'Edit Product' : 'Create Product'
  const description = initialData ? 'Edit Product' : 'Add new Product'
  const toastMessage = initialData ? 'Product Updated' : 'Product Created'
  const action = initialData ? 'Save Changes' : 'Create Product'


  const onSubmit= async (values: z.infer<typeof formSchema>) => {
    try{
      setIsLoading(true)
     
      if(initialData) {
        await axios.patch(`/api/${params.storeId}/products/${params.productId}`, values)
      } else {
       await axios.post(`/api/${params.storeId}/products`, values)
        
      }
      toast.success(toastMessage)
      router.push(`/${params.storeId}/products`)
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
         await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
      toast.success('product Removed')
      location.reload()
      router.push(`/${params.storeId}/products`)
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
                name='images'
                render={({field}) => (
                    <FormItem>
                      <FormLabel>Product Images</FormLabel>
                      <FormControl>
                        <ImagesUpload 
                          value={field.value.map((image) => image.url)}
                          onChange={(urls) => {
                            field.onChange(urls.map((url) => ({url})))
                          }}
                          onRemove={(url) => {
                            field.onChange(
                              field.value.filter(current => current.url !==url)
                            )
                          }}
                          disabled={isLoading}

                        />
                      </FormControl>
                    </FormItem>
                )}
              />

              <div className='grid grid-cols-3 gap-8'>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} placeholder="Product name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type='number' disabled={isLoading} placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                   <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                         disabled={isLoading}
                         onValueChange={field.onChange}
                         value={field.value}
                         defaultValue={field.value}
                      >
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            defaultValue={field.value}
                            placeholder='Select a category'
                          />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                   <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Select
                         disabled={isLoading}
                         onValueChange={field.onChange}
                         value={field.value}
                         defaultValue={field.value}
                      >
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            defaultValue={field.value}
                            placeholder='Select a size'
                          />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {sizes.map((size) => (
                            <SelectItem key={size.id} value={size.name}>
                              {size.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="kitchen"
                render={({ field }) => (
                  <FormItem>
                   <FormLabel>Kitchen</FormLabel>
                    <FormControl>
                      <Select
                         disabled={isLoading}
                         onValueChange={field.onChange}
                         value={field.value}
                         defaultValue={field.value}
                      >
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            defaultValue={field.value}
                            placeholder='Select a kitchen'
                          />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {kitchens.map((kitchen) => (
                            <SelectItem key={kitchen.id} value={kitchen.name}>
                              {kitchen.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                   <FormLabel>Cuisine</FormLabel>
                    <FormControl>
                      <Select
                         disabled={isLoading}
                         onValueChange={field.onChange}
                         value={field.value}
                         defaultValue={field.value}
                      >
                        <FormControl>
                        <SelectTrigger>
                          <SelectValue 
                            defaultValue={field.value}
                            placeholder='Select a cuisine'
                          />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cuisines.map((cuisine) => (
                            <SelectItem key={cuisine.id} value={cuisine.name}>
                              {cuisine.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3'>
                    <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Featured</FormLabel>
                      <FormDescription>
                        this product will be on home screen under featured products
                      </FormDescription>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isArchived"
                render={({ field }) => (
                  <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3'>
                    <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Archived</FormLabel>
                      <FormDescription>
                        this product will not be displayed
                      </FormDescription>
                    </div>
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

export default ProductForm
