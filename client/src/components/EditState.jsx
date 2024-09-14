import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function EditState({ Data  , HandleInput , Name, Bio, Username}) {
    const [Interests, setInterests] = useState([]);
    const [InterestsError, setInterestsError] = useState(null);


    const HandleInterests = (e) => {
        if (e.key === ',') {
            e.preventDefault();
            const value = e.target.value.trim();
            if (Interests.length < 5) {
                if (value && !Interests.includes(value)) {
                    setInterests((prevInterests) => [...prevInterests, value]);
                    e.target.value = '';
                }
            } else {
                setInterestsError("Max interests added");
            }
        }
    };

    const RemoveInterests = (index) => {
        setInterests((prevInterests) => prevInterests.filter((_, i) => i !== index));
    };

   

    useEffect(() => {
        if (InterestsError) {
            const timer = setTimeout(() => {
                setInterestsError(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [InterestsError]);

    return (
        <div className='flex flex-col gap-[20px]'>
            <input
                type="text"
                className='border-2 border-gray-200 rounded-md outline-none p-[7px]'
                placeholder='Your name'
                name='name'
                value={Name}
                onChange={(e) => HandleInput(e, "name")}
            />

            <input
                type="text"
                className='border-2 border-gray-200 rounded-md outline-none p-[7px]'
                name='username'
                placeholder='Your username'
                value={Username}
                onChange={(e) => HandleInput(e, "username")}
            />

            <input
                type="text"
                name='bio'
                className='border-2 border-gray-200 rounded-md outline-none p-[7px]'
                placeholder='Your bio'
                value={Bio}
                onChange={(e) => HandleInput(e, "bio")}
            />

            <div className='flex gap-[20px] items-center'>
                {Interests.map((value, index) => (
                    <p key={index} className='bg-[crimson] relative px-[20px] py-[7px] text-white rounded-lg'>
                        {value}
                        <span
                            className='cursor-pointer absolute left-[90%] bottom-[60%]'
                            onClick={() => RemoveInterests(index)}
                        >
                            <CloseIcon sx={{ fontSize: 15 }} className='bg-gray-800 rounded-full ' />
                        </span>
                    </p>
                ))}
            </div>

            {InterestsError && <p className='text-red-500'>{InterestsError}</p>}
            
            <input
                onKeyDown={HandleInterests}
                type="text"
                id='interests'
                placeholder='Add interest'
                className='border-2 border-gray-200 rounded-md outline-none p-[7px]'
            />

            <label className='font-semibold text-gray-500' htmlFor="interests">
                <i>Press , after each interest</i>
            </label>
        </div>
    );
}
