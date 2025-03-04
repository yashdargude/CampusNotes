import { Navigate } from "react-router-dom"

export default function ProfileRoutes({ children }) {
  const profile = localStorage.getItem('isProfileCreated');
  
  return profile ? <>{children}</> : <Navigate to="/createprofile" />;

}