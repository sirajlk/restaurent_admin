"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import CellActions from "./cell-actions"
import { OrderCellImage } from "./cell-image"
import { cn } from "@/lib/utils"


export type OrdersColumns = {
  id: string
  phone: string
  address: string
  products: string
  totalPrice: string
  images: string[]
  isPaid: boolean
  order_status: string
  createdAt: string
}

export const theOrdersColumns: ColumnDef<OrdersColumns>[] = [
  {
    accessorKey: "images",
    header: 'Images',
    cell: ({row}) => (
      <div className="grid grid-cols-2 gap-2">
        <OrderCellImage data={row.original.images} />
      </div>
    )
  },
  {
    accessorKey: "products",
    header: 'Products'
  },
  {
    accessorKey: "phone",
    header: 'Phone'
  },
  {
    accessorKey: "address",
    header: 'Address'
  },
  {
    accessorKey: "totalPrice",
    header: 'Total Price'
  },
  {
    accessorKey: "order_status",
    header: 'Status',
    cell: ({row}) => {
      const {order_status} = row.original

      return (
        <p className={cn(
          'text-lg font-semibold',
         ( order_status === 'Delivering' && 'text-yellow-500') || 
         ( order_status === 'Processing' && 'text-orange-500') || 
         ( order_status === 'Delivered' && 'text-emerald-500') || 
         ( order_status === 'Canceled' && 'text-red-500')  
         
        )}>
          {order_status}
        </p>
      )
    }
  },
  {
    accessorKey: "isPaid",
    header: 'Payment status',
    cell: ({row}) => {
      const {isPaid} = row.original

      return (
        <p className={cn(
          'text-lg font-semibold',
          isPaid ? 'text-emerald-500': 'text-red-500'
        )}>
          {isPaid ? 'Paid': 'Not Paid'}
        </p>
      )
    }
  },
 
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    id: 'action',
    cell: ({row}) => <CellActions data={row.original} />
  }
]
