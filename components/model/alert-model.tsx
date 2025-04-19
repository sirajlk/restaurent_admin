'use client'

import { useEffect, useState } from "react"
import Model from "../Model"
import { Button } from "../ui/button"

interface AlertModelProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading: boolean
}

export const AlertModel = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}: AlertModelProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted){
        return null
    }

    return (
        <Model 
          title='Are you sure' 
          description='This action cant be undone!..' 
          isOpen={isOpen}
          onClose={onClose}
          >
            <div className="pt-6 flex items-center space-x-2 justify-end w-full">
                <Button disabled={loading} variant='outline' onClick={onClose} >Cabncel</Button>
                <Button disabled={loading} variant='destructive' onClick={onConfirm} >Confirm</Button>
            </div>
        </Model>
    )
}