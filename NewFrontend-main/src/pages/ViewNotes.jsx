import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { GetAllFilterService, GetFilesByFilter } from '../services/FilterService';
import { Button, Option, Select, Typography } from '@material-tailwind/react';
import LoadingSkeleton from '../components/LoadingSkeleton';
import NotesCard from '../components/NotesCard';
function ViewNotes() {
  const [data, setData] = useState([]);
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState('');
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [filesLoaded, setFilesLoaded] = useState(false);

  function handleBranchChange(val) {
    setBranch(val);

  }

  const branchData = data.find(item => item.branch === branch) || [];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      branch,
      semester,
      subject
    }
    // console.log(data);
    setIsLoading(true)
    setFilesLoaded(true)
    GetFilesByFilter(data)
      .then(res => {

        setFiles(res);
        setIsLoading(false)
        setFilesLoaded(false)
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false)
        setFilesLoaded(false)
      })
  }

  // console.log(files);

  useEffect(() => {

    GetAllFilterService()
      .then(res => {

        if (res.length != 0) {
          setData(res)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <>
      <div className='container mx-auto px-4'>
        <section className='flex flex-col items-center justify-center '>
          <header className='flex items-center justify-center'>
            <h1 className='text-2xl lg:text-3xl text-center font-semibold underline'>
              Search notes.
            </h1>
          </header>
          <form onSubmit={handleSubmit} className='mt-16 mb-28  max-w-screen-lg w-full sm:w-96 '>
            <div className='flex flex-col lg:flex-row items-center justify-center w-full gap-6'>

              <Select variant='standard' size='lg' color='gray' label='Branch' onChange={(val) => handleBranchChange(val)}>
                {
                  data.map(item => (
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
              <Select variant='standard' size='lg' color='gray' label='Subject' onChange={(val) => setSubject(val)}>
                {
                  branchData.length != 0 && semData != 0 && subjects.length != 0 ? subjects.map((item, i) => (
                    <Option key={i} value={item}>{item}</Option>
                  )) : <Option disabled>First select a semester</Option>
                }
              </Select>
            </div>
            <Button loading={isLoading} type='submit' variant="gradient" className="flex items-center justify-center gap-3 mt-4" fullWidth >
              Search
            </Button>
          </form>
        </section>
        <section className='flex flex-col items-center justify-center'>
          <header className='flex items-center justify-center'>
            <h1 className='text-2xl lg:text-3xl text-center font-semibold underline'>
              Searched notes appear here.
            </h1>
          </header>

          <div className={`flex flex-col w-full items-center justify-center gap-6 mb-10 ${data.length > 5 ? 'h-[50rem] overflow-y-auto' : ''} px-8 pt-8 pb-10`}>
            {
              !filesLoaded ? <>
                {
                  files.length > 0 ? <>
                    {
                      files.map(item => (
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

    </>
  )
}

export default ViewNotes