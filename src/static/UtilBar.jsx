import React from 'react'
import { Rectangle } from '../assets/icons/Rectangle'
import { Circle } from '../assets/icons/Circle'

export const UtilBar = ({onExport}) => {
  return (
    <div className='utilsBar'>
        <button onClick={onExport} className='generateButton'>
            Export to HTML
        </button>
        <Rectangle/>
        <Circle />
    </div>
  )
}
