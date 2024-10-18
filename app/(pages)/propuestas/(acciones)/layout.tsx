import { LayoutProps } from '@/.next/types/app/layout'
import React from 'react'

export default function layout({children} : LayoutProps) {
  return (
    <div className='h-screen overflow-auto'>
      {children}
    </div>
  )
}
