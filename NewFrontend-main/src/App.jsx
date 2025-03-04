import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import { Register } from "./pages/Register"
import { Login } from "./pages/Login"
import DashboardLayout from "./layouts/DashboardLayout"

import PageNotFound from "./pages/PageNotFound"
import PrivateRoutes from "./routes/PrivateRoutes"

import Profile from "./pages/Profile"

import { useEffect, useState } from "react"
import PreLoader from "./components/PreLoader"
import Notes from "./pages/Notes"
import ViewNotes from "./pages/ViewNotes"

import Chat from "./pages/Chat"
import CreateProfile from "./pages/CreateProfile"
import ProfileRoutes from "./routes/ProfileRoutes"


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const profile = localStorage.getItem('isProfileCreated');

  useEffect(() => {
    const load = () => {
      setTimeout(() => {
        setIsLoading(false)
      }, 3000)
    }

    load()
  }, [])

  return (
    <>
      {
        isLoading ? <PreLoader /> :
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/createprofile' element={<CreateProfile />} />
            {
              <Route element={<PrivateRoutes><DashboardLayout /></PrivateRoutes>}>
                <Route path="/notes" element={<Notes />} />
                <Route path="/viewnotes" element={<ViewNotes />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/Chat" element={<Chat />} />
              </Route>
            }
            <Route path="*" element={<PageNotFound />} />
          </Routes>
      }
    </>
  )
}

export default App
