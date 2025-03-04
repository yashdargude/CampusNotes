import { CloudArrowUpIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

function Dropzone({
  className,
  files = [],
  setFiles
}) {
  const [rejected, setRejected] = useState([])
  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles?.length === 1) {
      setFiles(previousFiles => [
        ...previousFiles,
        ...acceptedFiles.map(file =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      ])
    }
    if (fileRejections?.length) {

      setRejected(previousFiles => [...previousFiles, ...fileRejections])
    }

  }, [])



  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': [],
    }
  })

  const removeFile = name => {
    setFiles(files => files.filter(file => file.name !== name))
  }

  const removeRejected = name => {
    setFiles(files => files.filter(file => file.name !== name))
    setRejected(files => files.filter(({ file }) => file.name !== name))
  }
  const removeAll = () => {
    setFiles([])
    setRejected([])
  }

  return (
    <>
      <div {...getRootProps({
        className: className
      })}>
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-4'>
          <div>
            <CloudArrowUpIcon className='h-10 text-black' />
          </div>
          {
            isDragActive ?
              <p className=' font-medium tracking-wider text-lg lg:text-xl text-black'>Drop the files here ...</p> :
              <p className=' font-medium tracking-wider text-lg lg:text-xl text-black'>Drag 'n' drop only one here, or click to select one file</p>
          }
        </div>

      </div>
      <div>
        <h4 className=' font-bold text-lg text-black'>Uploaded Files : </h4>
      </div>
      {files.length != 0 ? (<>
        <div className='w-full flex items-center justify-end mb-2'>
          <button type='button' className='px-2 py-1 hover:bg-slate-600 rounded-md bg-gray-800  font-light 
          text-sm text-white' onClick={removeAll}>
            Remove all
          </button>
        </div>
        <div className='w-full  bg-white rounded-md'>
          <ul className={`${files.length == 0 ? '' : 'p-2'} flex flex-wrap items-center gap-2`}>

            {files.map(file => (
              <li key={file.name} className='relative inline-block mb-2' >
                <h3 className='px-4 py-2 rounded-md shadow-md bg-blatext-black_bg  font-semibold text-black'>
                  {file.name}
                </h3>
                <button className='absolute -right-2 -top-2' onClick={() => removeFile(file.name)}>
                  <XCircleIcon className='h-6 text-red-500 hover:text-red-700' />
                </button>
              </li>
            ))}
          </ul>
        </div></>) : (
        <div className='w-full'>
          <p className='text-center  font-medium text-md text-red-500'>No files uploaded yet</p>
        </div>
      )}

      <div>
        {rejected.length != 0 ? (

          <>
            <div>
              <h4 className=' font-bold text-lg text-red-500'>Rejected Files : </h4>
            </div>
            {rejected.length != 0 ? (<div className='w-full  bg-white rounded-md'>
              <ul className={`${files.length == 0 ? '' : 'p-2'} flex flex-wrap items-center gap-2`}>

                {rejected.map(({ file, errors }) => (
                  <li key={file.name} className='relative inline-block mb-2' >
                    <h3 className='px-4 py-2 rounded-md shadow-md bg-red-200  font-semibold text-black'>
                      {file.name}
                    </h3>
                    <button className='absolute -right-2 -top-2' onClick={() => removeRejected(file.name)}>
                      <XCircleIcon className='h-6 text-red-500 hover:text-red-700' />
                    </button>
                    <ul className='text-md text-red-400'>
                      {errors.map(error => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>) : (
              <div className='w-full'>
                <p className='text-center  font-medium'>No files uploaded yet</p>
              </div>
            )}
          </>


        ) : (
          ''
        )}
      </div>

    </>
  )
}

export default Dropzone