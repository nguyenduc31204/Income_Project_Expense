import React, { use, useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu'

const ProfilePhotoSelector = ({image, setImage}) => {
        const inputRef = useRef(null)
    const [preview, setPreview] = useState(null)
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(file) {
            setImage(file)
        }

        const preview = URL.createObjectURL(file)
        setPreview(preview)
    }

    const handleRemoveImage = () => {
        setImage(null)
        setPreview(null)
    }

    const onChooseFile = () => {
            inputRef.current.click()
    }
  return <div className='flex justify-center mb-6'>
    <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className='hidden'
    />
    {!image ? (
        <div className='w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full relative'>
            <LuUser className='text-4xl text-primary'/>
            <button 
            type='button'
            className='w-8 h-8 flex justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-1'
            onClick={onChooseFile}>
                <LuUpload />
            </button>
        </div>
    ) : (
        <div className='relative'>
            <img src={preview} alt="" className='w-20 h-20 rounded-full object-cover'/>
            <button
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1'
                onClick={handleRemoveImage}
            >
                <LuTrash />
            </button>
        </div>
    )}
  </div>
}

export default ProfilePhotoSelector
