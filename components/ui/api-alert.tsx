'use client'

import { Copy, Server } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./alert"
import { Badge, BadgeProps } from "./badge"
import { Button } from "./button"
import toast from "react-hot-toast"

interface ApiAlertProps {
    title: string
    description: string
    variant: 'public' | 'admin'
}

const textMap: Record<ApiAlertProps['variant'], string> = {
    public: 'Public',
    admin: 'Admin'
}

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
    public: 'secondary',
    admin: 'destructive'
}

export const ApiAlert = ({
    title,
    description,
    variant
}: ApiAlertProps) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description)
        toast.success('Api Route copied')
    }

    return (
        <Alert>
            <Server className="w-4 h-4 " />
            <AlertTitle className="flex items-center gap-x-2">
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
            </AlertTitle>
            <AlertDescription className="mt-4 items-center flex justify-between">
                <code className="relative rounded-md bg-muted px-[0.3rem] py-[0.2rem]  ">
                    {description}
                </code>
                <Button variant='outline' size='icon' onClick={onCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </AlertDescription>
        </Alert>
    )
}