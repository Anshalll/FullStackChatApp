import React, {useRef, useState} from 'react'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ImageUpload from './EditStateprofile/Postupload';

export default function CreatepostDialog() {

    let [Image, setImage] = useState(null)

    const HandleCreatePostDialog = () => {

        let comp = document.getElementById('createPosts')
        comp.style.display = "none"

    }

    const ImgRef = useRef()


    const createnewPost = () => {

        ImgRef.current.click()

    }

    const HandleImage = (e) => {
        setImage(e.target.files[0])

    }
    

  return (
    <div id='createPosts' className='hidden absolute w-full h-full items-center justify-center'>
     {Image ? <ImageUpload Image={Image}/> :     <dialog open className='bg-white w-[600px] gap-[40px] h-[400px] shadow-lg flex flex-col'>

            <div className='w-full h-[60px] flex justify-between px-[20px] py-[3px] border-b-2 border-black items-center'>
                <p>Post</p>
                 <button onClick={HandleCreatePostDialog}><CloseOutlinedIcon/></button>  
            </div>

            <div className='h-[calc(100%-60px)] w-full flex gap-[20px] items-center justify-center'>

            <button onClick={createnewPost} title='Image' className='hover:w-[120px] hover:shadow-lg hover:h-[120px] bg-[crimson] text-white h-[100px] w-[100px] rounded-full'><ImageOutlinedIcon/></button>

            <input onChange={HandleImage} ref={ImgRef} type="file" className='hidden'  accept='.jpg, .png , .jpeg'/>
            {/* <button title='Short' className='hover:w-[120px] hover:shadow-lg hover:h-[120px] bg-cyan-500 text-white h-[100px] w-[100px] rounded-full'><MovieOutlinedIcon/></button>
            <button title='Video' className='hover:w-[120px] hover:shadow-lg hover:h-[120px] bg-green-500 text-white h-[100px] w-[100px] rounded-full'><SlideshowOutlinedIcon/></button> */}

            </div>


        </dialog>}
    </div>
  )
}
