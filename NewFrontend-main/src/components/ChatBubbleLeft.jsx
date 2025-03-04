import {
  Tooltip,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import React from 'react'

function ChatBubbleLeft({
  message = '',
  firstname = '',
  lastname = '',
  email = '',
  year = '',
  branch = ''
}) {

  const initial = firstname.toUpperCase().charAt(0);

  return (
    <>
      <div className="flex justify-start gap-4 mb-4">

        <Menu allowHover>
          <MenuHandler>
            <div className='grid cursor-pointer place-items-center bg-black h-8 w-8 rounded-full'>
              <span className='text-white'>{initial}</span>
            </div>

          </MenuHandler>
          <MenuList className='p-0'>
            <Card className="w-96 bg-white">
              <CardBody>
                <Typography variant="h6" color="blue-gray" className="text-xl mb-2">
                  {firstname.toUpperCase() + " " + lastname.toUpperCase()}
                </Typography>

                <Typography variant="h6" color="blue-gray" className="mb-2 underline font-light text-lg text-blue-700">
                  {email}
                </Typography>
                <div className='flex flex-col items-start justify-center gap-2'>
                  <div className='flex items-center gap-2'>
                    <h3 className='font-semibold text-lg'>Branch : </h3>
                    <h5 className='font-medium text-md text-black'>{branch}</h5>
                  </div>
                  <div className='flex items-center gap-2'>
                    <h3>Year : </h3>
                    <h5>{year}</h5>
                  </div>
                </div>
              </CardBody>
              {/* <CardFooter className="pt-0">
                <Button>Read More</Button>
              </CardFooter> */}
            </Card>
          </MenuList>
        </Menu>
        <div
          className="mr-3 text-sm max-w-60 lg:max-w-96 bg-white py-2 px-4 shadow rounded-xl"
        >
          {message}
        </div>
      </div>

    </>
  )
}

export default ChatBubbleLeft