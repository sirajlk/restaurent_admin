'use client'
import React, { useState } from "react";
import { OrdersColumns } from "./columns";
import { useParams, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreVertical, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/lib/firebase";
import axios from "axios";
import { AlertModel } from "@/components/model/alert-model";
interface CellActionsProps {
  data: OrdersColumns;
}
const CellActions = ({ data }: CellActionsProps) => {
  const router = useRouter();
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Order ID copied succesfully')
  }
  const onDelete = async() => {
    try{
      setIsLoading(true)
         await axios.delete(`/api/${params.storeId}/orders/${data.id}`)
      toast.success('Order Removed')
      location.reload()
      router.push(`/${params.storeId}/orders`)
    } catch(error){
      toast.error('something went wrong')
      console.log(error)
    }finally{
      setIsLoading(false)
      setOpen(false)
    }
  }
  const onUpdate = async(data: any) => {
    try{
      setIsLoading(true)
         await axios.patch(`/api/${params.storeId}/orders/${data.id}`, data)
      toast.success('Order Updated')
      location.reload()
      router.push(`/${params.storeId}/orders`)
    } catch(error){
      toast.error('something went wrong')
      console.log(error)
    }finally{
      router.refresh()
      setIsLoading(false)
    }
  }
  return (
    <>
    <AlertModel
      isOpen= {open}
      onClose= {() => setOpen(false)}
      onConfirm={onDelete}
      loading={isLoading}
     />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant='ghost'>
                <span className="sr-only">Open</span>
                <MoreVertical className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => onCopy(data.id)}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdate({id: data.id, order_status: 'Delivering'})}>
            <Edit className="h-4 w-4 mr-2" />
            Delivering
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdate({id: data.id, order_status: 'Delivered'})}>
            <Edit className="h-4 w-4 mr-2" />
            Delivered
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={() => onUpdate({id: data.id, order_status: 'Canceled'})}>
            <Edit className="h-4 w-4 mr-2" />
            Cancel
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActions;
