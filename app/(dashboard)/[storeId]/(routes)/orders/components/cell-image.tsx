'use client'

import Image from "next/image"

interface CellImageProps {
    data: string[]
}

export const OrderCellImage = ({data}: CellImageProps) => {
    return (
        <>
          {data.map((url, index) => (
            <div key={index} className="overflow-hidden w-16 min-w-16 h-16 min-h-16 aspect-square rounded-md flex items-center justify-center relative">
                <Image 
                  alt='image'
                  fill
                  className="object-contain"
                  src={url}
                />
            </div>
          ))}
        </>
    )
}