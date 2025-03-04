import React, { useEffect, useState } from 'react'
import Dropzone from '../components/Dropzone';
import { Button, Input, Option, Select, Typography } from '@material-tailwind/react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

import Notify from '../helpers/Notify';
import NotesCard from '../components/NotesCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { GetAllFilterService } from '../services/FilterService';


function Notes() {
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState('');
  const [publication, setPublication] = useState('');
  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([]);
  const [filesLoaded, setFilesLoaded] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [update,setUpdate] = useState(0);

  function clearData() {
    setBranch('')
    setSemester('')
    setPublication('')
    setSubject('')
    setFile([])
  }

  function handleBranchChange(val) {
    setBranch(val);

  }

  const branchData = filterData.find(item => item.branch === branch) || [];

  let subjects = [];
  let semData = 0
  if (branchData.length != 0 && semester) {
    semData = Object.keys(branchData.sem).find(item => item === semester)

    const l = Object.entries(branchData.sem)
    l.map(item => {
      if (item[0] == semData) {
        subjects = [...Object.values(item[1])[0]]
      }
    })

  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!branch || !semester || !publication || !subject || !file[0]) {
      Notify('error', 'Please enter all details');
      return
    }

    const fromdata = new FormData();
    fromdata.append('branch', branch)
    fromdata.append('semester', semester)
    fromdata.append('subject', subject)
    fromdata.append('publicationName', publication)
    fromdata.append('file', file[0])

    const headers = {
      "Content-Type": "multipart/form-data",
      auth_token: localStorage.getItem('auth_token')
    }
    setIsLoading(true)
    axios.post('/api/file/upload', fromdata, {
      headers
    })
      .then(response => {
        console.log(response);
        if (response.status === 201) {
          
          Notify('success', 'Notes added successfully');
          setIsLoading(false)
          clearData()
          setUpdate(prev=>prev+1);
        }
        else {
          Notify('error', 'Cannot upload notes, please try again later!')
          setIsLoading(false)
        }
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
      })



  }

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem('auth_token')
    }
    setFilesLoaded(true)
    axios.get('/api/file/allfiles', { headers })
      .then(res => {
   
        if (res.status === 200) {
          setData(res.data.data.files)
        }
        else {
          setData([])
        }
        setFilesLoaded(false)
      })
      .catch(error => {
        console.log(error);
        setFilesLoaded(false)
      })


    GetAllFilterService()
      .then(res => {
        // console.log(res);
        if (res.length != 0) {
          setFilterData(res)
        }
      })
      .catch(error => {
        console.log(error);
      })

  }, [update])

  return (
    <>
      <div>
        <div className='container mx-auto px-4'>

          <section className='flex flex-col items-center justify-center '>
            <header className='flex items-center justify-center'>
              <h1 className='text-2xl lg:text-3xl text-center font-semibold underline'>
                Add your notes here.
              </h1>
            </header>
            <form className='mt-16 mb-28  max-w-screen-lg w-full sm:w-96 ' onSubmit={(e) => handleSubmit(e)}>
              <div className='flex flex-col gap-6'>

                <Select variant='standard' size='lg' color='gray' label='Branch' onChange={(val) => handleBranchChange(val)} >
                  {
                    filterData.map(item => (
                      <Option key={item._id} value={`${item.branch}`}>{item.branch}</Option>
                    ))

                  }
                </Select>
                <Select variant='standard' size='lg' color='gray' label='Semester' onChange={(val) => setSemester(val)}>
                  {
                    branchData.length != 0 ? Object.keys(branchData.sem).map((item) => (
                      <Option key={item} value={item}>{item}</Option>
                    )) : <Option disabled>First select a branch</Option>
                  }
                </Select>
                <Select variant='standard' size='lg' color='gray' label='subject' onChange={(val) => setSubject(val)}>
                  {
                    branchData.length != 0 && semData != 0 && subjects.length != 0 ? subjects.map((item, i) => (
                      <Option key={i} value={item}>{item}</Option>
                    )) : <Option disabled>First select a semester</Option>
                  }
                </Select>
                <Input variant='standard' size='lg' color='gray' label='Publication' placeholder='eg. Decode' className='' onChange={(e) => setPublication(e.target.value)} value={publication} />
                <div className='flex flex-col justify-center gap-1'>
                  <label htmlFor="teamname" className=' font-medium tracking-wider text-blue-gray-300'>File</label>
                  <Dropzone className={'px-16 py-8 bg-white rounded-md border-2 border-dashed border-black'} files={file} setFiles={setFile} />
                </div>

              </div>
              <Button loading={isLoading} type='submit' variant="gradient" className="flex items-center justify-center gap-3 mt-4" fullWidth >
                <CloudArrowUpIcon className='h-5 w-5' />
                Upload File
              </Button>
            </form>

          </section>
          <section className='flex flex-col items-center justify-center'>
            <header className='flex items-center justify-center'>
              <h1 className='text-2xl lg:text-3xl text-center font-semibold underline'>
                All your uploaded notes are here.
              </h1>
            </header>

            <div className={`flex flex-col w-full items-center justify-center gap-6 mb-10 ${data.length > 5 ? 'h-[50rem] overflow-y-auto ' : ''} px-8  pb-10`}>
              {
                !filesLoaded ? <>
                  {
                    data.length > 0 ? <>
                      {
                        data.map(item => (
                          <NotesCard key={item._id}
                            item={item}

                          />))
                      }
                    </> : <Typography variant="h5" color="gray" className="mt-10 mb-10 font-light">
                      No notes added yet....
                    </Typography>
                  }
                </> : <>
                  <div className='flex flex-col w-full items-center justify-center gap-6 mt-10'>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />

                  </div>
                </>
              }
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Notes