import React from 'react'

export default function ErrorInterface() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <object type="image/svg+xml" data="/imgs/server-down.svg" width="200" height="200"></object>
      <h4 className='font-bold max-w-[220px] text-center'>¡Upps! Ha ocurrido un error, intentalo mas tarde.</h4>
    </div>
  )
}
