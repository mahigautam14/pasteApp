import React, { useEffect } from 'react'
import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AddToPaste, updateToPaste } from '../reudx/PasteSlice';
const Home = () => {
    const [title,setTitle] = useState("");
    const [value,setValue] = useState("");
    const [searchParams,setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch  = useDispatch();
    const allPastes = useSelector((state)=>state.Paste.pastes);
    useEffect(() => {
        if(pasteId){
            const paste = allPastes.find((p)=>p._id === pasteId);
            setTitle(paste.title);
            setValue(paste.content);
        }
    }, [pasteId])
    
    function createPaste(){
        const paste ={
            title:title,
            content:value,
            _id:pasteId ||
                    Date.now().toString(36),
            createdAt:new Date().toISOString(),
        }
        if(pasteId){
            //update
            dispatch(updateToPaste(paste));
        }
        else{
            //create 
            dispatch(AddToPaste(paste));
        }
        //after creation or updation
        setTitle('');
        setValue('');
        setSearchParams({});
    }

return (
    <div>
        <div className='flex flex-row mt-2 gap-8 place-content-evenly'>
        <input type="text" placeholder='Enter title here' value={title}
        onChange={(e)=>setTitle(e.target.value)} className='p-2 rounded-xl mt-2 bg-gray-100 w-[60%] pl-4'  />
         <button className='p-2 rounded-xl mt-2 bg-gray-100' onClick={createPaste}>{
            pasteId?"Upadate my paste":"Create my paste"  }
    </button>
        </div>
        
       
    <div className='mt-8'>   
        <textarea
            className='rounded-2xl mt-4 min-w-[500px] p-4 bg-gray-100'
            value={value}
            placeholder='Enter content here'
            onChange={(e)=>setValue(e.target.value)}
            rows={20}
        />
    </div>
    </div>
)
}

export default Home
