import React, {useRef , useState} from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {useFormsMutation} from '../../redux/Apis/Apis'
import { useSelector } from 'react-redux';

export default function EditDp({ image , setDpUpdate , DpError}) {

  const DpRef = useRef()
  const [ImgPreview, setImgPreview] = useState(image)
  const [DeleteDP] = useFormsMutation()
  const { loggedUserData, loading } = useSelector((state) => state.Loggeduserslice)


  const DpHandle = () => {


    DpRef.current.click()

  }

  const DpUpdate = (e) => {

    let dp = e.target.files[0]
    setDpUpdate(dp)

    if (dp) {

      let reader = new FileReader()

      reader.onload = (e) => {
        
        setImgPreview(e.target.result)

      }
      
      reader.readAsDataURL(dp)

    }


  }


  const HandleDpdelete = async () => {
      
    if (!loading && loggedUserData.dpimage !== "http://localhost:4000/defaults/default_user.jpg") {

      const update_dp = await DeleteDP({  method: "PATCH" , path: '/api/deleteimg' , data: {type: "dp"} })
      if (update_dp.data.success) {
        setImgPreview('http://localhost:4000/defaults/default_user.jpg')
        DpRef.current.value = ""
        setDpUpdate(null)
      }
      if (update_dp.error) {
          console.error(update_dp.error?.error)
      }





    }
    
  }

  return (

    <>
    <div className='  w-[200px] h-[200px]  rounded-full'>
      <div className='w-full  h-full relative flex '>

        <img src={ImgPreview} alt="" className='w-full  h-full  rounded-full object-cover object-center' />
       
        <div className='  gap-[20px] rounded-full absolute w-full h-full flex items-center justify-center'>
          <button onClick={DpHandle} className='text-black shadow-lg hover:bg-[crimson] hover:text-[white] z-[1] bg-white rounded-full w-[30px] h-[30px]'><FileUploadOutlinedIcon/><input onChange={DpUpdate} type="file" ref={DpRef} className='invisible'  accept='.jpg, .png , .jpeg'/></button>

          <button onClick={HandleDpdelete} className='text-black shadow-lg hover:bg-[crimson] hover:text-[white] z-[1] bg-white rounded-full w-[30px] h-[30px]'><DeleteOutlineOutlinedIcon/></button>
        </div>


      </div>
    </div>
      <br />
    {DpError &&   <p className='text-[crimson]'>{DpError}</p>}
    
    </>

  )
}
