import React , {useRef} from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UpgradeOutlinedIcon from '@mui/icons-material/UpgradeOutlined';
import { useImageDeleteMutation } from '../redux/Apis/Apis';


export default function Updateuserdp({ setDP, setErrors, setDP_preview, DP_preview }) {

  const [imgdelete ] = useImageDeleteMutation()

  const fileref  = useRef(null)
  
  const ActivateFileinput = (e) => {
    e.preventDefault()
    fileref.current.click()
  }

  const HandleFileDelete = async (e) => {
   
    e.preventDefault()
    if (DP_preview !== "http://localhost:4000/defaults/default_user.jpg") {
      setDP(null)
     setDP_preview("http://localhost:4000/defaults/default_user.jpg")
      
    }
    const results = await imgdelete({path: "/api/deletedp" , method: "DELETE"})
    if (results.error) {
      setErrors("An error occured")    
    }
  
    
  }

  const Handleprofiledp = (e) => {


    const file = e.target.files[0]
    const file_exts = ["image/jpeg", "image/png"]
    if (!file_exts.includes(file.type)) {

      setErrors("only png and jpg file formats are allowed.")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setErrors("Profile image size exceeded 5 mb")
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
    <div className='updatedp hover:bg-black  w-[250px] active flex h-[250px] bg-gray-300 rounded-full relative'>
      <img src={DP_preview} alt="" className='w-full h-full object-cover object-center rounded-full' />
      <div className='updatebtns hidden justify-center w-full h-full items-center gap-[20px] absolute rounded-full'>
        <button onClick={HandleFileDelete} className='bg-white  hover:bg-[crimson] hover:text-white border-2 border-black w-[40px] h-[40px] rounded-full'><DeleteOutlineOutlinedIcon /></button>
        <button onClick={ActivateFileinput} className='bg-white border-2 hover:bg-[crimson] hover:text-white border-black w-[40px] h-[40px] rounded-full'><UpgradeOutlinedIcon /></button>
        <input type="file" ref={fileref} onChange={Handleprofiledp} className='hidden' accept="image/jpeg, image/png" />

      </div>
      {/* <div className='flex items-center justify-center hover:bg-black hover:opacity-[0.5] absolute w-full h-full rounded-full'>
      
      </div> */}

    </div>
  )
}
