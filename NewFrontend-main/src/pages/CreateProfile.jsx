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
import Notify from '../helpers/Notify';
import { useNavigate } from 'react-router-dom';


function CreateProfile() {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [gender, setGender] = useState('');
  const [collegename, setCollegeName] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false);

  const headers = {
    "Content-Type": "application/json",
    auth_token: localStorage.getItem('auth_token')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

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

    if (!collegename) {
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
      collegename: collegename,
      year: year,
      branch: branch
    }


    setIsLoading(true);
    axios.patch('/api/profile/updateprofile', data, { headers })
      .then((res) => {

        if (res.status === 200) {
          Notify('success', 'Profile created')
          localStorage.setItem('isProfileCreated', true)
          navigate('/notes')
        }
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        console.log(err);
      })
  }

  return (
    <div className='bg-purple-300 h-full  w-full'>
      <div className='container mx-auto p-8'>
        <Card className='w-full h-full'>
          <CardHeader className='flex items-center justify-between shadow-none mt-2'>
            <div>
              <h1 className='text-3xl text-black font-semibold'>
                Create Profile
              </h1>
            </div>

          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className='"mb-1 flex flex-col gap-6'>

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


                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Gender
                </Typography>
                <Select label="Gender"
                  onChange={(val) => setGender(val)}
                  value={gender}
                >
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
                  onChange={(e) => setCollegeName(e.target.value)}
                  value={collegename}

                />

                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Year
                </Typography>
                <Select label="Year"
                  onChange={(val) => setYear(val)}
                  value={year}

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

                >
                  <Option value='IT'>IT</Option>
                  <Option value='CE'>CE</Option>
                  <Option value='ENTC'>ENTC</Option>

                </Select>

              </div>
              <Button loading={isLoading} type='submit' variant="gradient" className="flex items-center justify-center gap-3 mt-8" fullWidth >
                <CheckIcon className='h-5 w-5' />
                Create Profile
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default CreateProfile