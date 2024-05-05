"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type Props = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  url: string;
  id: string|null|undefined;
  modalName: string;
}

export default function DeleteModal({show, url, id, modalName, setShow}: Props) {
  const [disabled, setDisabled] = useState<boolean>(false)
  const router = useRouter();

  async function onDelete(url:string, id:string|null|undefined){
    try {
      setDisabled(true)
      const { data } = await axios.delete(`${url}/${id}`);
      
      setShow(false);
      setDisabled(false)
      toast.success(data.message);
      router.refresh();
    } catch (error: any) {
      setShow(false);
      setDisabled(false)
      toast.error(error.response.data.message);
    }
  }

  return (
    <>
      {show && (
        <div className='fixed top-0 left-0 h-screen w-screen bg-black/30 flex items-center justify-center'>
          <div className='bg-white p-4 rounded-md max-w-lg mx-5 sm:mx-20 flex flex-col gap-6 items-center'>
            <h3 className='font-semibold text-lg text-center'>Are you sure you want to delete selected {modalName}?</h3>
            <div className='flex flex-row gap-4'>
              <button className='p-2 px-4 items-center justify-center w-40 inline-flex bg-blue-600 rounded-md hover:bg-blue-800 text-white transition-all ease-in duration-100' onClick={() => onDelete(url, id)} disabled={disabled}>
                {disabled ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <>
                    <p className="text-white">Delete</p>
                  </>
                )}
              </button>
              <button className='p-2 px-4 border border-gray-500 rounded-md hover:bg-gray-400 transition-all ease-in duration-100' onClick={() => setShow(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}