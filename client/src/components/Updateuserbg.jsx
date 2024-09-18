import React, { useRef } from 'react'
import { useImageDeleteMutation } from '../redux/Apis/Apis';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';

export default function Updateuserbg({ setBG, setBG_preview, BG_preview, setErrors }) {

    const fileref = useRef(null)
    const [imgdelete] = useImageDeleteMutation()

    const ActivateFileinput = (e) => {
        e.preventDefault()
        fileref.current.click()
    }

    const HandleprofileBG = (e) => {
        try {
            const file = e.target.files[0]
            const file_exts = ["image/jpeg", "image/png"]
            if (!file_exts.includes(file.type)) {

                setErrors("only png and jpg file formats are allowed.")
                return
            }

            if (file.size > 10 * 1024 * 1024) {
                setErrors("Background image size exceeded 10 mb")
                return

            }

            const reader = new FileReader()

            reader.onload = (e) => {
                setBG_preview(e.target.result)
                setBG(file)

            }
            reader.readAsDataURL(file)
        } catch (error) {
            setErrors("An error occured!")
            return
        }



    }


    const HandleFileDelete = async (e) => {

        e.preventDefault()
        if (BG_preview !== "http://localhost:4000/defaults/default_user.jpg") {
            setBG(null)
            setBG_preview("http://localhost:4000/defaults/default_user.jpg")

        }
        const results = await imgdelete({ path: "/api/deletebg", method: "DELETE" })
        if (results.error) {
            setErrors("An error occured")
        }


    }


    return (
        <div className='bgdiv w-[1500px] flex h-[300px] bg-gray-300 rounded-lg relative'>
            <img src={BG_preview} alt="" className='w-full h-full object-cover object-center rounded-lg' />
            <div className='updatebg hidden justify-center w-full h-full items-center gap-[20px] absolute rounded-lg'>
                <button onClick={HandleFileDelete} className='bg-white  hover:bg-[crimson] hover:text-white border-2 border-black w-[40px] h-[40px] rounded-full'><DeleteOutlineOutlinedIcon /></button>
                <button onClick={ActivateFileinput} className='bg-white border-2 hover:bg-[crimson] hover:text-white border-black w-[40px] h-[40px] rounded-full'><UpgradeOutlinedIcon /></button>
                <input type="file" ref={fileref} onChange={HandleprofileBG} className='hidden' accept="image/jpeg, image/png" />
            </div>
        </div>
    )
}
