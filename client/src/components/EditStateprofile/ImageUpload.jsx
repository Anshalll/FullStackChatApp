import React, { useEffect, useState } from 'react'

export default function ImageUpload({  Image }) {

    const [ImgPreview , setImgPreview] = useState(null)

    useEffect(() => {
        
      let reader = new FileReader()

      reader.onload = (e) => {
        
        setImgPreview(e.target.result)

      }
      
      reader.readAsDataURL(Image)


    } , [Image])

  return (
    <div className='bg-white w-[900px] gap-[40px] h-[700px] flex rounded-lg p-[20px] shadow-xl'>

            <div className='w-[40%] h-full'>

                <img src={ImgPreview} alt="" className='w-full h-full object-cover object-center' />
            </div>

            <div className='flex flex-col gap-[20px]'>

            </div>

    </div>
  )
}
