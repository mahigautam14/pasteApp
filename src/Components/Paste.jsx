import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { pasteSlice, removeFromPaste } from '../reudx/PasteSlice'
import { Button } from "@material-tailwind/react"
import toast ,{Toaster} from 'react-hot-toast'

const Paste = () => {
  const pastes = useSelector((state)=>state.Paste.pastes);
  console.log(pastes);
  const [searchTerm,setSearchTerm] =  useState('');
  const dispatch = useDispatch();
  const filteredData = pastes.filter(
    (paste)=>paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  )
  function handleDelete(pasteId){
      dispatch(removeFromPaste(pasteId));
  }
  return (
    <div>
      <input type="search"
      className='p-2 rounded-xl w-[600px] mt-5 bg-gray-50'
      placeholder='Search here'
      value={searchTerm}
      onChange={(e)=>setSearchTerm(e.target.value)} />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 && 
          filteredData.map(
            (paste)=>{
              return(
                <div className='border bg-gray-100' key={paste?._id}>
                  <div>
                    {paste.title}
                  </div>
                  <div>
                    {paste.content}
                  </div>
                  <div className='flex flex-row gap-4 place-content-evenly '>
                        <button className='bg-green-400'><a href={`/?pasteId=${paste?._id}`}>Edit</a></button>
                        <button className='bg-red-300'>
                          <a href={`/pastes/${paste?._id}`}>View</a>
                          </button>
                        <button onClick={()=>handleDelete(paste?._id)} className='bg-blue-400'>Delete</button>
                        <button onClick={()=>{navigator.clipboard.writeText(paste?.content)
                          toast.success("Copied to clipboard")
                        }} className='bg-orange-400'>Copy</button>
                        <button className='bg-purple-400'>Share</button>

                  </div>
                  <div>
                    {paste.createdAt}
                  </div>
                </div>
              )
            }
          )
        }

      </div>
    </div>
  )
}

export default Paste

