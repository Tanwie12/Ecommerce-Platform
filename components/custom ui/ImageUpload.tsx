import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '@nextui-org/react';
import { Plus,LucideTrash as Trash } from 'lucide-react';
import { on } from 'events';
import Image from 'next/image';
 
type Props = {
  value:string[],
  onChange:(value:string)=>void,  
  onRemove:(value:string)=>void


}

const ImageUpload: React.FC<Props>=({
  value,
  onChange,
  onRemove
})=> {
  const onUpload = (result:any) => {
    onChange(result.info.secure_url)
    // onRemove(result.info.secure_url) 
   }
  return (
    <div>
       <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button type="button" onClick={() => onRemove(url)} size="sm" className="bg-red-1 text-white">
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>
    <CldUploadWidget uploadPreset="ml_default" onSuccess={onUpload}>
      {({ open }) => (
        <Button startContent={<Plus className="w-5 h-5"/>} onClick={() => open()}>
          Upload an Image
        </Button>
      )}
    </CldUploadWidget>
    </div>
  )
}

export default ImageUpload