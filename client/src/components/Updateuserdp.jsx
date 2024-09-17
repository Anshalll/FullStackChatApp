import React from 'react'


export default function Updateuserdp({ setDP, setImgError, setDP_preview, DP_preview }) {

  const Handleprofiledp = (e) => {

    const file = e.target.files[0]
    const file_exts = ["image/jpeg" , "image/png"]
    if (!file_exts.includes(file.type)) {
      console.log(file.type)
      setImgError("only png and jpg file formats are allowed.")
      return 
    }

    if (file.size > 5 * 1024 * 1024) {
      setImgError("Image size exceeded 5 mb")
      return

    }

    const reader = new FileReader()

    reader.onload = (e) => {
      setDP_preview(e.target.result)
      setDP(file)

    }
    reader.readAsDataURL(file)


  }

  return (
    <div className='w-[250px] flex h-[250px] bg-gray-300 rounded-full relative'>
      <img src={DP_preview} alt="" className='w-full h-full object-cover object-center rounded-full' />
      <div className='flex items-center justify-center hover:bg-black hover:opacity-[0.5] absolute w-full h-full rounded-full'>
        <input type="file" onChange={Handleprofiledp} className='opacity-0 w-full h-full rounded-full' accept="image/jpeg, image/png" />
      </div>

    </div>
  )
}
