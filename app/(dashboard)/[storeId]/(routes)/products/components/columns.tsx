"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import CellActions from "./cell-actions"


export type ProductsColumns = {
  id: string,
  name: string,
  price : string,
  images: {url: string}[],
  isFeatured: boolean,
  isArchived: boolean,
  category: string,
  size: string,
  kitchen: string,
  cuisine: string,
  createdAt: string
}

export const theProductColumns: ColumnDef<ProductsColumns>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",
    header: 'Price'
  },
  {
    accessorKey: "isFeatured",
    header: 'Featured'
  },
  {
    accessorKey: "Archived",
    header: 'Archived'
  },
  {
    accessorKey: "category",
    header: 'Category'
  },
  {
    accessorKey: "size",
    header: 'Size'
  },
  {
    accessorKey: "kitchen",
    header: 'Kitchen'
  },
  {
    accessorKey: "cuisine",
    header: 'Cuisine'
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
