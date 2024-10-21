import { LayoutPropsLib } from '@/lib/utils/definitions'
import React from 'react'
import "../../public/styles/grapesjs.module.css";

export default function layout({children} : LayoutPropsLib) {
  return (
    <div>
      {children}
    </div>
  )
}
