import React, { useEffect, useState } from 'react'
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import { useFileUploadMutation} from '../../redux/Apis/Apis'

export default function Postupload({ Image }) {

   
    const [PostUpload] = useFileUploadMutation()

    const [ImgPreview, setImgPreview] = useState(null)


    useEffect(() => {

        let reader = new FileReader()

        reader.onload = (e) => {
         
            setImgPreview(e.target.result)

        }

        reader.readAsDataURL(Image)


    }, [Image])

    const HandleImageupload = async (e) => {

        e.preventDefault()
        let formdata = new FormData(e.target)
 
     

        
        formdata.append("post" , Image)
    
        let Uploadpost = await PostUpload({ path: "/api/uploadpost" , method: "POST" , data: formdata  })

        if (Uploadpost.error) {
            console.error(Uploadpost.error.message)

        }
        else if(Uploadpost.data){
            window.location.reload()
        }
    }

    return (
        <div className='bg-white w-[900px] gap-[40px] h-[700px] flex rounded-lg p-[20px] shadow-xl'>

            <div className='w-[40%] h-full'>

                <img src={ImgPreview} alt="" className='w-full h-full object-cover object-center' />
            </div>

            <form onSubmit={HandleImageupload} className='w-[60%] flex flex-col gap-[20px] '>
                <div className='w-full h-[60px] flex items-center justify-end'>
                    <button className='px-[40px] bg-[crimson] rounded-lg py-[7px] text-white'>Cancel</button>
                </div>
                <div className='flex flex-col gap-[20px] shadow-lg w-full rounded-lg overflow-y-auto h-[calc(100%-60px)] p-[20px]'>
                    <textarea name="description" id="description" placeholder='Description'  className='outline-none border-2 border-black rounded-lg h-[100px] w-full p-[7px]'></textarea>
               

                    <div className='flex w-full items-center border-2 border-black justify-between rounded-lg p-[7px]'>

                        <div className='flex gap-[10px] items-center'>

                            <EmojiPeopleOutlinedIcon />
                            <p>Audience</p>
                        </div>

                        <select name="audience" id="audience" className='outline-none flex w-[40%]'>

                            <option value="followers">Followers</option>
                            <option value="public">Public</option>
                            <option value="group">Group</option>
                            <option value="all">All</option>

                        </select>
                    </div>


                    <div className='flex justify-between w-full items-center p-[7px] border-2 border-black rounded-lg'>
                        <p>Hide like counts</p>
                        <input type="radio" name='hidelike'/>
                    </div>

                    <div className='flex justify-between w-full items-center p-[7px] border-2 border-black rounded-lg'>
                        <p>Turn off commenting</p>
                        <input type="radio"  name='allowcommenting'/>
                    </div>

                    <div className='flex justify-between w-full items-center p-[7px] border-2 border-black rounded-lg'>
                        <p>Tun of sharing</p>
                        <input type="radio" name='sharing'/>
                    </div>
        <div className='flex flex-col gap-[20px] w-full'>
            <p>Add tags</p>
            <input type="text" name='tags' className='w-full outline-none border-2 border-black p-[7px] rounded-lg' placeholder='Sports, gaming etc..' />

        </div>

        <button type='submit' className='bg-green-500 p-[10px] rounded-full w-full text-white'>Post</button>

                </div>
            </form>

        </div>
    )
}
