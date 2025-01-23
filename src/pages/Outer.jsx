import React from 'react'
import { UtilBar } from '../static/UtilBar'
import { downloadHTMLFile } from '../utils/exportUtils'

export const Outer = () => {
  return (
        <>
        <UtilBar onExport={downloadHTMLFile}/>
        </>
  )
}
