import { LayoutPropsLib } from '@/lib/utils/definitions'
import React from 'react'

export default function layout({children} : LayoutPropsLib) {
  return (
    <div className='h-screen overflow-auto'>
      {children}
    </div>
  )
}
