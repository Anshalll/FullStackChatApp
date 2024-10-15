import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { debounce } from 'lodash';
import { useFormsMutation } from '../redux/Apis/Apis';
import { useSelector } from 'react-redux';

export default function Navbar() {

    const [SearchedResult, setSearchedResult] = useState([]);

    const [SearchingData, setSearchingData] = useState(false);

    const { loggedUserData } = useSelector((state) => state.Loggeduserslice)

    const [SearchData] = useFormsMutation();

    const Searching = async (value) => {

        setSearchingData(true);

        try {

            const rcvd_resp = await SearchData({ path: '/api/listprofile', method: 'POST', data: value });

            if (rcvd_resp?.data?.data) {

                setSearchedResult(rcvd_resp.data.data);

                setSearchingData(false);

            } else {

                setSearchedResult([]);

                setSearchingData(false);

            }

        } catch (error) {
           
            setSearchingData(false);
        }
    };


    const DebounceSearch = debounce((value) => {

        if (value) {

            let data = { value };

            Searching(data);

        } else {

            setSearchedResult([]);
            setSearchingData(false);

        }
    }, 1000)

    const HandleSearch = (e) => {
        setSearchingData(true);
        let value = e.target.value.trim();
        DebounceSearch(value);
    };

    return (
        <nav className='w-full h-full px-[20px] flex justify-between items-center'>
            <h1>Anshal's chatapp</h1>
            <div className='relative w-[700px] rounded-lg border-2 border-black h-[60%]'>
                <input onChange={HandleSearch} type="text" placeholder='Search for something...' className='px-[10px] rounded-lg w-full h-full outline-none' />
                <div className='w-full flex flex-col gap-[20px] absolute justify-center shadow-lg top-[60px] bg-slate-100 rounded-lg'>
                    {SearchingData ? "Loading..." :

                        ( SearchedResult.map((value, index) => (
                            <a key={index} href={`/profile?user=${value.belongsto.username}`} className='hover:bg-gray-400 p-[10px] flex justify-between items-center border-b border-gray-300'>
                                <div className='flex items-center gap-[20px]'>
                                    <img src={value.dpimage} alt="" className='w-[50px] h-[50px] rounded-lg' />
                                </div>
                                <div className='flex flex-col gap-[20px] justify-center w-[200px]'>
                                   {loggedUserData.belongsto.username !== value.belongsto.username ?   <>
                                    <p className='flex justify-end items-center'>{value.belongsto.name.slice(0, 20)}</p>
                                    <i className='flex justify-end items-center'>@{value.belongsto.username.slice(0, 20)}</i>
                                    </> :  <p className='flex justify-end items-center'>You</p>}
                                </div>
                            </a>
                        ))
                          
                        )
                    }
                </div>
            </div>
            <div className='flex gap-[20px] items-center'>
                <NavLink to={'/profile'} className={({ isActive }) => `${isActive ? "bg-[crimson] text-white" : "border-2 border-black"} px-[40px] p-[7px] rounded-full`}>Profile</NavLink>
            </div>
        </nav>
    );
}
