import React from 'react'

function PreLoader() {
  return (
    <div className='bg-white w-full h-screen flex items-center justify-center'>

      <div className='flex space-x-2 justify-center items-center bg-white h-screen dark:invert'>
        <span className='sr-only'>Loading...</span>
        <div className='h-8 w-8 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
        <div className='h-8 w-8 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
        <div className='h-8 w-8 bg-purple-700 rounded-full animate-bounce'></div>
      </div>

    </div>
  )
}

export default PreLoader