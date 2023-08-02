import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = ({ loggedIn }) => {
  return loggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;
