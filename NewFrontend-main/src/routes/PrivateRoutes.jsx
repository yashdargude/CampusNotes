import { Navigate } from "react-router-dom"

export default function PrivateRoutes({ children }) {
  const user = localStorage.getItem('auth_token');
  return user ? <>{children}</> : <Navigate to="/login" />;

}
