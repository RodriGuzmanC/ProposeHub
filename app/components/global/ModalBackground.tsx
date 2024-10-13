import React from 'react'

interface modalBackProps{
  children: React.ReactNode
}

export default function ModalBackground({children} : modalBackProps) {
  return (
    <div className='z-10 flex justify-center items-center fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50' onClick={() => { console.log("hola") }}>
        {children}
    </div>
  )
}
