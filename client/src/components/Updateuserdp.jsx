import React from 'react'


export default function Updateuserdp({ setDP , DP , setImgError}) {

  const Handleprofiledp = (e) => {

    const file = e.target.files[0]
    if (file.type === "image/jpeg" || file.type === "image/png") {
      if (file) { 
        const reader = new FileReader()
  
        reader.onload = (e) => {
          setDP(e.target.result)
        }
        reader.readAsDataURL(file)
      }
    }
    else{
      setImgError("only png and jpg file formats are allowed.")
    }

    
    
  }

  return (
    <div className='w-[250px] flex h-[250px] bg-gray-300 rounded-full relative'>
      <img src={DP} alt="" className='w-full h-full object-cover object-center rounded-full' />
      <div className='flex items-center justify-center hover:bg-black hover:opacity-[0.5] absolute w-full h-full rounded-full'>
          <input type="file" onChange={Handleprofiledp} className='opacity-0 w-full h-full rounded-full' accept="image/jpeg, image/png"/>
      </div>

    </div>
  )
}
