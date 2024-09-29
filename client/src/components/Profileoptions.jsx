import React , {useEffect , useRef , useState} from 'react'

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';

export default function Profileoptions() {

    const profileoptionref = useRef()
    const [Profileoptions, setprofileoptions] = useState(false)

    useEffect(() => {
     
        
        const windowclick = (e) => {
        const element  = e.target
        if (Profileoptions) {
            if (element !== profileoptionref.current && !profileoptionref.current.contains(element)) {
                console.log("executed")
                setprofileoptions(false)
            }
        }

          
        }
  
        window.addEventListener("click" , windowclick)
    
  
      } , [profileoptionref , Profileoptions ])


      const HandleProfileoptions = (e) => {
        e.preventDefault()
        
        Profileoptions ? setprofileoptions(!profileoptionref) : setprofileoptions(true)
      } 

  return (
    
    <div ref={profileoptionref} className='relative'>

    <button    onClick={HandleProfileoptions} className='relative'><MoreVertOutlinedIcon />    </button>

        <span className={`${Profileoptions ? "flex" : "hidden"} flex-col gap-[20px] p-[10px] bg-gray-300 absolute right-[10%] rounded-lg w-[300px]`}>
            <p className='flex w-full'>Invite to group</p>

            <p className='flex w-full text-red-500 font-bold'>Block</p>
            <p className='flex w-full text-red-500 font-bold'>Report</p>

        </span>


    </div>


  )
}
