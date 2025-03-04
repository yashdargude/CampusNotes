import { TrashIcon } from '@heroicons/react/24/outline'
import { Button, Card, CardBody, CardFooter, Chip, Tooltip, Typography } from '@material-tailwind/react'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

function NotesCard({
  item = { branch: '', subject: '', publicationName: '', semester: '', link: '' },
  isRemovable = false,
  remove = () => { },


}) {


  function visit(e) {
    e.preventDefault();
  }

  return (
    <>
      <Card className="mt-6 max-w-screen-lg w-full px-1 relative">
        <div className="absolute top-4 right-4">
          {isRemovable && <Tooltip content="Remove" placement="top" className="bg-gray-600" animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0, y: 25 },
          }}>
            <Button variant="text" className=" p-1 bg-transparent" size="sm" onClick={remove}
            >
              <TrashIcon
                className="h-4 lg:h-5 w-4 lg:w-5 text-red-700"

              />
            </Button>
          </Tooltip>}
        </div>
        <CardBody>
          <table className='w-full min-w-max table-auto text-left mb-4'>
            <thead>
              <tr className='w-full'>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Branch
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Subject
                  </Typography>
                </th>

                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Semester
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Publiction
                  </Typography>
                </th>


              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-blue-gray-50/50">

                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.branch}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.subject}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.semester}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography variant="small" color="blue-gray" className="font-normal">
                    {item.publicationName}
                  </Typography>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="pt-0">

          <NavLink to={item.link} target='_blank' className='flex w-full'>

            <Chip variant='gradient' size='lg' value='Open File' className='w-full text-center' />
          </NavLink>

        </CardFooter>
      </Card>
    </>
  )
}

export default NotesCard