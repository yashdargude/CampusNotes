
import { Outlet } from 'react-router-dom'
import { Footer } from '../components/Footer'

import DashboardNav from '../components/DashboardNav'
import Sidebar from '../components/Sidebar'
import { Button, IconButton } from '@material-tailwind/react'
import ResponsiveSidebar from '../components/ResponsiveSidebar'
import { useState } from 'react'
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline'




function DashboardLayout() {
  const [open, setOpen] = useState(false);
  

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  return (
    <>

      <div className='relative'>
        <button onClick={openDrawer} className='fixed block lg:hidden z-50 left-4 top-20  bg-black hover:bg-gray-800 p-1 rounded-full'><Bars3Icon className="h-6 w-6 stroke-2 text-white" /></button>
        <ResponsiveSidebar openDrawer={openDrawer} closeDrawer={closeDrawer} open={open} />
        <div className='container mx-auto flex items-center px-8 py-4 lg:px-4 '>
          <DashboardNav />
        </div>
        <div className='relative flex w-full'>
          <div className='fixed hidden lg:block mt-14'>
            <Sidebar />
          </div>
          <div className='lg:ml-[17rem] w-full pt-28 bg-gray-50'>
            <Outlet />
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardLayout