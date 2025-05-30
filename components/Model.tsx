import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface ModelProps {
    title: string,
    description: string,
    isOpen: boolean,
    onClose: () => void
    children?: React.ReactNode
}

const Model = ({title, description, isOpen, onClose, children}: ModelProps) => {
  const onChange = (open: boolean) => {
    if(!open){
      onClose()
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
        <div>{children}</div>
    </DialogContent>
  </Dialog>
  
  )
}

export default Model
