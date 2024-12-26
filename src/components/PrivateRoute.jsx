import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const isLoggedIn =
    role === "admin"
      ? localStorage.getItem("isAdminLoggedIn")
      : localStorage.getItem("isVolunteerLoggedIn");

  return isLoggedIn ? children : <Navigate to={`/${role}/login`} />;
};

export default PrivateRoute;
