import React from 'react'
import PageNotFoundImage from '../assets/404 Error Page not Found with people connecting a plug-pana.svg'

function PageNotFound() {
  return (
    <>
      <div className='flex items-center justify-center h-screen w-full'>
        <img src={PageNotFoundImage} alt="Page not found" className='w-[60%] h-auto' />
      </div>
    </>
  )
}

export default PageNotFound