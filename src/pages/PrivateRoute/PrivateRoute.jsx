import { Navigate, useLocation } from "react-router";
import useAuth from "../../MyHooks/useAuth";
import Loader from "../../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  console.log(location, "from location");

  if (loading) {
    return <Loader></Loader>;
  }

  if (user) {
    return children;
  } else {
    return (
      <Navigate state={location.pathname} to="/login">
        {" "}
      </Navigate>
    );
  }
};

export default PrivateRoute;
