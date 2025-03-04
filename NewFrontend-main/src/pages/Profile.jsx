import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input, Option, Select,
  Tooltip,
} from "@material-tailwind/react";
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import LoadingSkeleton from '../components/LoadingSkeleton';
import Notify from '../helpers/Notify';


function Profile() {
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [college, setCollege] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [editable, setEditable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(0);
  const [load, setLoad] = useState(false)



  useEffect(() => {
    setIsLoading(true);
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem('auth_token')
    }
    axios.get('api/profile/userdata', { headers })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.data?.user?.user_id.collegename);
          setEmail(res.data.data?.user?.user_id.email);
          setFirstname(res.data.data?.user?.user_id.firstname)
          setLastname(res.data.data?.user?.user_id.lastname)
          setGender(res.data.data?.user?.user_id.gender)
          setCollege(res.data.data?.user?.user_id.collegename)
          setYear(res.data.data?.user?.user_id.year)
          setBranch(res.data.data?.user?.user_id.branch)
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      })
  }, [setUpdate])

  const handleSubmit = (e) => {
    e.preventDefault()
    const headers = {
      "Content-Type": "application/json",
      auth_token: localStorage.getItem('auth_token')
    }

    if (!firstname) {
      Notify('error', 'Please enter first name')
      return;
    }

    if (!lastname) {
      Notify('error', 'Please enter last name')
      return;
    }

    if (!gender) {
      Notify('error', 'Please select gender')
      return;
    }

    if (!college) {
      Notify('error', 'Please enter college name')
      return;
    }

    if (!year) {
      Notify('error', 'Please select year')
      return;
    }

    if (!branch) {
      Notify('error', 'Please select branch')
      return;
    }

    const data = {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      collegename: college,
      year: year,
      branch: branch
    }

    console.log(data);
    setLoad(true);
    axios.patch('/api/profile/updateprofile', data, { headers })
      .then((res) => {
        
        if (res.status === 200) {
          Notify('success', 'Profile updated')
        }
        setLoad(false)
        setEditable(true)
        setUpdate((prev) => prev + 1)
      })
      .catch((err) => {
        setLoad(false)
        setEditable(true)
        console.log(err);
      })
  }


  return (
    <div>
      <div className='container mx-auto mb-8'>
        {
          !isLoading ?
            <Card className='px-4 mx-4 lg:mx-12'>
              <CardHeader className='flex items-center justify-between shadow-none mt-2'>
                <div>
                  <h1 className='text-3xl text-black font-semibold'>
                    Profile
                  </h1>
                </div>
                <div className='cursor-pointer' onClick={() => setEditable(!editable)} >
                  <Tooltip
                    content="Edit Profile"
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0, y: 25 },
                    }}
                  >
                    <PencilSquareIcon className='h-5 w-5 text-red-500 animate-bounce' />

                  </Tooltip>
                </div>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleSubmit}>
                  <div className='"mb-1 flex flex-col gap-6'>
                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Email
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      disabled
                      value={email}
                    />

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      First Name
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Rishikesh"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => setFirstname(e.target.value)}
                      value={firstname}
                      disabled={editable}
                    />

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Last Name
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="Revandikar"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
                      disabled={editable}

                    />

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Gender
                    </Typography>
                    <Select label="Gender"
                      onChange={(val) => setGender(val)}
                      value={gender}
                      disabled={editable}>
                      <Option value='Male'>Male</Option>
                      <Option value='Female'>Female</Option>
                    </Select>

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      College Name
                    </Typography>
                    <Input
                      size="lg"
                      placeholder="PICT"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      onChange={(e) => setCollege(e.target.value)}
                      value={college}
                      disabled={editable}
                    />

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Year
                    </Typography>
                    <Select label="Year"
                      onChange={(val) => setYear(val)}
                      value={year}
                      disabled={editable}
                    >
                      <Option value='FE'>FE</Option>
                      <Option value='SE'>SE</Option>
                      <Option value='TE'>TE</Option>
                      <Option value='BE'>BE</Option>
                    </Select>

                    <Typography variant="h6" color="blue-gray" className="-mb-3">
                      Branch
                    </Typography>
                    <Select label="Branch"
                      onChange={(val) => setBranch(val)}
                      value={branch}
                      disabled={editable}
                    >
                      <Option value='IT'>IT</Option>
                      <Option value='CE'>CE</Option>
                      <Option value='ENTC'>ENTC</Option>

                    </Select>

                  </div>
                  {!editable && <Button loading={load} type='submit' variant="gradient" className="flex items-center justify-center gap-3 mt-8" fullWidth >
                    <CheckIcon className='h-5 w-5' />
                    Update Profile
                  </Button>}
                </form>
              </CardBody>
            </Card> :
            <div className="max-w-full animate-pulse px-4 mx-12">
              <Typography
                as="div"
                variant="h1"
                className="mb-4 w-16 h-16 rounded-full  bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-full w-full  bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-full w-full  bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-full w-full  bg-gray-300"
              >
                &nbsp;
              </Typography>

              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-full w-full  bg-gray-300"
              >
                &nbsp;
              </Typography>

            </div>
        }
      </div>
    </div>
  )
}

export default Profile