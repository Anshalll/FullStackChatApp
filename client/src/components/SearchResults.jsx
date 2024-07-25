import React  , {useMemo, useState} from 'react'
import { Link } from 'react-router-dom'
import {History , Close , Search} from '@mui/icons-material'
const SearchResults = () => {

 
  const arr = [{ type: "history" , name: "manish" } , {type: "serached" , name: 'anshal'}]


  return (

    <div className=' p-[20px] w-[39%] absolute bg-black z-[10] rounded-lg flex flex-col gap-[20px] max-h-[10cm]'>

      {arr.map((value  , index) => {
        return <div key={index}>
          {value.type === "history" ?   <div className='flex items-center justify-between'> <p className='flex items-center gap-[20px]'><History/>{value.name}</p> <button><Close/></button> </div> : <Link className='flex items-center justify-between'> <p className='flex items-center gap-[20px]'><Search/>{value.name}</p>  </Link>}
        </div>
      })}

    </div>

  )
}

export default SearchResults