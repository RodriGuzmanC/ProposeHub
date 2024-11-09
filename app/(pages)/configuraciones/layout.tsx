import { LayoutPropsLib } from '@/lib/utils/definitions'
import React from 'react'

export default function layout({children} : LayoutPropsLib)  {
  return (
    <div className='bg-white text-primary h-full flex items-center'>
      {children}
    </div>
  )
}
