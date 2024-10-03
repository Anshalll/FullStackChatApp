import React, { useState } from 'react';
import { useFormsMutation } from '../redux/Apis/Apis';
import { useSelector } from 'react-redux';
import Datadialog from './Datadialog';


export default function UserDataList({ TotalFollowers, TotalGroups, TotalFollowing, TotalPosts, username , Admin}) {

    const [Data, setData] = useState([]);
    const [ShowModal , setShowModal] = useState(false)
    const [Typedata, setTypedata] = useState(null)
    const {userdata , loading} = useSelector((state) => state.userdataslice )
    const [Getdata, {isLoading: Loding_response}] = useFormsMutation()
    const [Logged_user , setLogged_user] = useState("")

    const HandleDatatoshow = async (e , data_type , req_type) => {
        e.preventDefault()
        if (!ShowModal) {
            setShowModal(true)
            setTypedata(data_type)

           if ( username  && userdata && !loading ) {

                const loggeduser = userdata.data[0]._id 
                const logged_username = userdata.data[0].username 
                setLogged_user(logged_username)

                let data = {loggeduser , username }


                const Handle_data = await Getdata({ data , method: "POST" , path:  `/api/${req_type}` })

                if (!Loding_response) {
                    if (Handle_data.data.data) {
                        setData(Handle_data.data.data)
                     
                    }
                    if (Handle_data.data.error) {
                        console.error('An error occured')
                    }
                }
           }
        }

    };

    const closeDialog = (e) => {
        e.preventDefault()

       if (ShowModal) {
        setShowModal(!ShowModal)
       }
    };


    return (
        <>
            <div className='flex gap-[30px] text-black'>
                <button className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Groups <span className='font-normal'>{TotalGroups}</span>
                </button>

                <button className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Posts: <span className='font-normal'>{TotalPosts}</span>
                </button>

                <button onClick={(e) => HandleDatatoshow(e, 'Followers' , 'getfollowers')} className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Followers <span className='font-normal'>{TotalFollowers}</span>
                </button>

                <button onClick={(e) => HandleDatatoshow(e, 'Following' , 'getfollowing')} className='font-bold bg-gray-200 px-[20px] py-[7px] rounded-lg'>
                    Following: <span className='font-normal'>{TotalFollowing}</span>
                </button>
            </div>

        <Datadialog ShowModal={ShowModal} Data={Data} Typedata={Typedata} closeDialog={closeDialog} Admin={Admin} Logged_user={Logged_user}/>
        </>
    );
}
