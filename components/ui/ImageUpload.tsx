'use client'

import { storage } from "@/lib/firebase"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {PuffLoader} from 'react-spinners'
import { Button } from "./button"
interface ImageUploadProps {
    disabled? : boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}
const ImageUpload = ({
    disabled,
    onChange,
    onRemove,
    value
}:ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    const onUpload = async(e : any) => {
        const file = e.target.files[0]
        setIsLoading(true)

        const uploadTask = uploadBytesResumable(
          ref(storage, `Images/${Date.now()}-${file.name}`),
          file,
          { contentType: file.type }
        )

        uploadTask.on('state_changed', 
          (snapshot) => {
            setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          },
          (error) => {toast.error(error.message)},
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              onChange(downloadURL)
              setIsLoading(false)
            })
          },
        )
    }

    const onDelete = (url: string) => {
      onRemove(url)
      deleteObject(ref(storage, url)).then(() => {
        toast.success('Image Removed')
      })
    }

  return (
    <div>
      {value && value.length > 0 ? (
        <>
          <div className="mb-4 flex items-center gap-4">
            {value.map((url) => (
              <div  className='relative w-52 h-52 rounded-md overflow-hidden' key={url}>
                <Image 
                 fill
                 src={url}
                 className='object-cover'
                 alt="Billboard Image"
                />
                <div className="absolute z-10 top-2 right-2">
                  <Button type="button" onClick={() => onDelete(url)} variant='destructive' size='icon'>
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-52 h-52 rounded-md overflow-hidden border border-dashed border-gray-200 flex items-center justify-center flex-col gap-3">
            {isLoading ? (
                <>
                <PuffLoader size={30} color="#555" />
                <p>{`${progress.toFixed(2)}%`}</p>
                </> 
            ): (
                <>
                <label>
                    <div>
                        <ImagePlus className="h-4 w-4" />
                        <p>Upload an image</p>
                    </div>
                    <input 
                      type="file"
                      onChange={onUpload}
                      accept="image/*"
                      className="w-0 h-0"
                    />
                </label>
                </>
            )}
        </div>
      )}
    </div>
  )
}

export default ImageUpload
