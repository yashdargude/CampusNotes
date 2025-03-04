import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Button, Input, Typography } from '@material-tailwind/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { PowerIcon } from '@heroicons/react/24/solid'
import { LogoutService } from '../services/AuthServices'
import ResponsiveSidebar from './ResponsiveSidebar'


function DashboardNav() {
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const isLoggedOut = await LogoutService();

      if (isLoggedOut) {
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='flex items-center justify-between w-full gap-4 bg-white  fixed left-0 top-0 z-10 h-max max-w-full px-4 py-2 lg:px-8 lg:py-4 border-b-2 border-gray-100'>
        <div className='flex items-center gap-6'>

          <Typography
            as="a"
            href="/"
            className="mr-4 cursor-pointer py-1.5 font-outfit font-bold text-2xl tracking-wider"
          >
            CampusNotes
          </Typography>
        </div>

        <div className='flex items-center gap-8'>
          {/* <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-3 lg:h-5 w-3 lg:w-5" />}
              label="Search"
            />
          </div> */}
          <div className='flex items-center gap-4'>
            <Button loading={isloading} color='red' className='hidden lg:flex items-center justify-center gap-2 ' variant='gradient' ripple={true} size='sm' onClick={handleLogout}>
              <PowerIcon className='h-4' />
              Log out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardNav