import React, { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Collapse,
} from "@material-tailwind/react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoutService } from "../services/AuthServices";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false)
  const profile = JSON.parse(localStorage.getItem('isProfileCreated'));
  

  const user = localStorage.getItem("auth_token");

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col items-center gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">


      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to={'/'}>About us</NavLink>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to={'/'}>Contact</NavLink>
      </Typography>

      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <NavLink to={'/'}>Features</NavLink>
      </Typography>
    </ul>
  );



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
    <div className="">
      <Navbar className="backdrop-blur-md bg-opacity-50 fixed left-0 top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
          <Typography
            as="a"
            href="#"
            className="mr-4 cursor-pointer py-1.5 font-outfit font-bold text-2xl tracking-wider"
          >
            CampusNotes
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {
                !user ? <>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={() => navigate('/login')}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={() => navigate('/register')}
                  >
                    <span>Sign in</span>
                  </Button>
                </> : <>
                  {
                    profile === true ? <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block"
                      onClick={() => navigate('/notes')}
                    >
                      <span>Dashboard</span>
                    </Button> : <Button
                      variant="gradient"
                      size="sm"
                      className="hidden lg:inline-block"
                      onClick={() => navigate('/createprofile')}
                    >
                      <span>Create Profile</span>
                    </Button>
                  }
                  <Button
                    color="red"
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={handleLogout}
                    loading={isloading}
                  >
                    <span>Logout</span>
                  </Button>
                </>
              }
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {
              !user ? <>
                <Button fullWidth variant="text" size="sm" className="" onClick={() => navigate('/login')}>
                  <span>Log In</span>
                </Button>
                <Button fullWidth variant="gradient" size="sm" className="" onClick={() => navigate('/register')}>
                  <span>Sign in</span>
                </Button>
              </> : <>
                {
                  profile === true ? <Button
                  fullWidth
                    variant="gradient"
                    size="sm"
                    onClick={() => navigate('/notes')}
                  >
                    <span>Dashboard</span>
                  </Button> : <Button
                  fullWidth
                    variant="gradient"
                    size="sm"

                    onClick={() => navigate('/createprofile')}
                  >
                    <span>Create Profile</span>
                  </Button>
                }
                <Button fullWidth variant="gradient" color="red" size="sm" className="" onClick={handleLogout}>
                  <span>Logout</span>
                </Button>
              </>
            }
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}