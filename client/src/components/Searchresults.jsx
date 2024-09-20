import React from 'react'


export default function Searchresults({ Searching , results}) {

  return (
    <div className='absolute shadow-lg  flex flex-col gap-[20px] overflow-y-auto z-[1] bg-white rounded-lg w-full max-h-[500px] '>
   {Searching ? "Loading..."  : results.map((value , index) => (  
    <a key={index} href={`/profile?user=${value.belongsto.username}`} className='w-full flex items-center justify-between border-b-2 border-gray-300 p-[20px]'>
    <div>
      <img src={value.dpimage} alt="" className='w-[50px] h-[50px] rounded-lg object-cover object-center rounded-full' />

    </div>
    <div className='flex flex-col gap-[10px] '>

    <p className='font-bold flex justify-end'>{value.belongsto.name.slice(0 , 30)}</p>
    <i>@{value.belongsto.username}</i>
    </div>

  </a>
    ) )}


    
  </div>
  )
}
