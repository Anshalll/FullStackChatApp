import React from 'react'


export default function Updateuserbg({ setBG, BG, setImgError }) {

    const HandleprofileBG = (e) => {

        const file = e.target.files[0]
        console.log(file.type)
        if (file.type === "image/jpeg" || file.type === "image/png") {
            if (file) {
                const reader = new FileReader()

                reader.onload = (e) => {
                    setBG(e.target.result)
                }
                reader.readAsDataURL(file)
            }

        }
        else {
            setImgError("only png and jpg file formats are allowed.")


        }


    }

    return (
        <div className='w-[1500px] flex h-[300px] bg-gray-300 rounded-lg relative'>
            <img src={BG} alt="" className='w-full h-full object-cover object-center rounded-lg' />
            <div className='flex items-center justify-center hover:bg-black hover:opacity-[0.5] absolute w-full h-full rounded-lg'>
                <input type="file" onChange={HandleprofileBG} className='opacity-0 w-full h-full rounded-full' accept="image/jpeg, image/png" />
            </div>
        </div>
    )
}
