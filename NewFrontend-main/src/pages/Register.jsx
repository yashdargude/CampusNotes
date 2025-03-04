import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import RegisterImage from '../assets/Notes-bro (2).svg'
import { NavLink, useNavigate } from "react-router-dom";
import validator from 'validator';
import { useState } from "react";
import { RegisterService } from "../services/AuthServices";
import Notify from "../helpers/Notify";

export function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) {
      Notify('error', 'Please enter email');
      return;
    }

    if (!validator.isEmail(email)) {
      Notify('error', 'Please enter valid email');
      return;
    }

    if (!password) {
      Notify('error', 'Please enter password');
      return;
    }

    if (!confirmPassword) {
      Notify('error', 'Password renter password');
      return;
    }

    if (password !== confirmPassword) {
      Notify('error', 'Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        email,
        password
      }
      const {status,profile} = await RegisterService(data);
      if (status) {
        setIsLoading(false);
        Notify('success', 'Registeration successfull');
        if (profile) {
          navigate('/notes')
        }
        else {
          Notify('info', 'Create profile');
          navigate('/createprofile')
        }
      }
      else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }

  }

  return (
    <>
      <div className="bg-deep-purple-400 ">
        <div className="absolute bg-purple-50 w-full top-52 h-40">

        </div>
        <div className="absolute bg-purple-400 w-full top-96 h-40">

        </div>
        <div className="relative container mx-auto grid grid-cols-1 lg:grid-cols-2 w-full h-screen px-8 gap-8">

          <div className="absolute left-4 top-2">
            <Typography
              as="a"
              href="/"
              className="mr-4 text-white cursor-pointer py-1.5 font-outfit font-bold text-4xl tracking-wider"
            >
              CampusNotes
            </Typography>
          </div>
          <div className="flex items-center justify-center ">
            <Card color="white" shadow={false} className="p-4  shadow-md">
              <Typography variant="h4" color="blue-gray">
                Sign Up
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Nice to meet you! Enter your details to register.
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={(e) => handleSubmit(e)}>
                <div className="mb-1 flex flex-col gap-6">

                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Confirm Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button loading={isLoading} color="green" type="submit" className="mt-6" fullWidth>
                  sign up
                </Button>
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Already have an account?{" "}
                  <NavLink to="/login" className="font-medium text-gray-900">
                    Sign In
                  </NavLink>
                </Typography>
              </form>
            </Card>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <img src={RegisterImage} alt="" className="w-[80%] h-auto transition-all delay-100
            duration-100 hover:scale-x-[1] -scale-x-[1]" />
          </div>
        </div>
      </div>
    </>
  );
}