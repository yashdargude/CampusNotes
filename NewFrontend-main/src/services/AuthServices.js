import clearStorage from "../helpers/ClearLocalStorage";
import Notify from "../helpers/Notify";
import axios from "axios";

async function RegisterService(data) {
  try {
    const response = await axios.post('/api/auth/register', data);
    if (response.status === 201) {
      
      localStorage.setItem('auth_token', response.data.data.auth_token.token);
      localStorage.setItem('isProfileCreated', response.data.data.isPofileCreated);
      localStorage.setItem('user_id', response.data.data.user_id);
      return { status: true, profile: response.data.data.isPofileCreated }

    }
    else {
      Notify('error', response.data.message);
      return { status: true, profile: false }
    }
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}

async function LoginService(data) {
  try {
    const response = await axios.post('/api/auth/login', data);
    
    if (response.status === 200) {

      localStorage.setItem('auth_token', response.data.data.auth_token.token);
      localStorage.setItem('isProfileCreated', response.data.data.isPofileCreated);
      localStorage.setItem('user_id', response.data.data.user_id);
      return { status: true, profile: response.data.data.isPofileCreated }
    }
    else {
      Notify('error', response.data.message);
      return { status: true, profile: false };
    }
  } catch (error) {
    console.log(error.response.data.message);
    Notify('error', error.response.data.message);
    // throw new Error(error)
  }
}

async function LogoutService() {

  const headers = {
    "Content-Type": "application/json",
    auth_token: localStorage.getItem('auth_token')

  }

  try {
    const response = await axios.post('/api/auth/logout', {}, { headers });

    if (response.status === 200) {
      clearStorage();
      Notify('success', response.data.message);
      return true;
    }
    else {
      Notify('error', response.data.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error)
  }
}


export {
  RegisterService,
  LoginService,
  LogoutService
}