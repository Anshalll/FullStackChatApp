import React, { useRef, useState } from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useFormsMutation} from '../../redux/Apis/Apis'
import { useSelector } from 'react-redux';

export default function EditBg({ image, setBgUpdate , BgError }) {

  const BgRef = useRef()
 

  const [ImgPreview, setImgPreview] = useState(image)
  const [DeleteDP] = useFormsMutation()
  const { loggedUserData, loading } = useSelector((state) => state.Loggeduserslice)


  const BgHandle = () => {


    BgRef.current.click()

  }

  const BgUpdate = (e) => {

    let Bg = e.target.files[0]
    setBgUpdate(Bg)

    if (Bg) {

      let reader = new FileReader()

      reader.onload = (e) => {

        setImgPreview(e.target.result)

      }

      reader.readAsDataURL(Bg)

    }


  }


  const HandleBgDelete = async () => {

    setImgPreview('http://localhost:4000/defaults/default_user.jpg')

    BgRef.current.value = ""
    setBgUpdate(null)
    
    if (!loading && loggedUserData.backgroundimage !== "http://localhost:4000/defaults/default_user.jpg") {

      const update_dp = await DeleteDP({  method: "PATCH" , path: '/api/deleteimg' , data: {type: "bg"} })
      if (update_dp.data.success) {
    

      }
      if (update_dp.error) {
          console.error(update_dp.error?.error)
      }
  }
  }
  return (
    <>
      <div className='w-full h-[400px]'>
        <div className='w-full  h-full relative flex '>

          <img src={ImgPreview} alt="" className='rounded-lg w-full h-full object-cover object-center' />

          <div className='gap-[20px] rounded-full absolute w-full h-full flex items-center justify-center'>

            <button onClick={BgHandle} className='text-black shadow-lg hover:bg-[crimson] hover:text-[white] z-[1] bg-white rounded-full w-[30px] h-[30px]'><FileUploadOutlinedIcon /><input onChange={BgUpdate} className='invisible' ref={BgRef} type="file" accept='.jpg, .png , .jpeg'/></button>

            <button onClick={HandleBgDelete} className='text-black shadow-lg hover:bg-[crimson] hover:text-[white] z-[1] bg-white rounded-full w-[30px] h-[30px]'><DeleteOutlineOutlinedIcon /></button>

          </div>

        </div>

      </div>

      {BgError && <p className='text-[crimson]'>{BgError}</p> }

    </>
  )
}
