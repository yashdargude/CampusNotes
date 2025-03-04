import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogoutService } from "../services/AuthServices";

export default function ResponsiveSidebar({
  openDrawer,
  closeDrawer,
  open
}) {
  const [active, setActive] = useState(2);

  const [isloading, setIsLoading] = useState(false)

  const navigate = useNavigate()



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
    <React.Fragment>
      {/* <Button onClick={openDrawer}>Open Drawer</Button> */}
      <Drawer open={open} onClose={closeDrawer} className="px-4">
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <List>
          <NavLink to={'/notes'} className={({ isActive }) => (isActive ? setActive(1) : null)}>
            <ListItem selected={active == 1 ? true : false}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Notes
            </ListItem>
          </NavLink>
          <NavLink to={'/profile'} className={({ isActive }) => (isActive ? setActive(2) : null)}>
            <ListItem selected={active == 2 ? true : false}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </NavLink>
          <NavLink to={'/viewnotes'} className={({ isActive }) => (isActive ? setActive(3) : null)}>
            <ListItem selected={active == 3 ? true : false}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Search Notes
            </ListItem>
          </NavLink>
          <NavLink to={'/Chat'} className={({ isActive }) => (isActive ? setActive(4) : null)}>
            <ListItem selected={active == 4 ? true : false}>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Chat
            </ListItem>
          </NavLink>
          <div className='flex items-center juce gap-4 mt-8'>
            <Button loading={isloading} className='flex items-center justify-center gap-2' variant='gradient' ripple={true} size='sm' onClick={handleLogout} fullWidth>
              <PowerIcon className='h-4' />
              Log out
            </Button>
          </div>

        </List>
      </Drawer>
    </React.Fragment>
  );
}