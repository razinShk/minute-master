import { useContext } from "react";
import { AuthContext } from "../../index.js";
import { Navigate, useLocation } from "react-router-dom";
import { Loader } from "../Loader/Loader";

const RequiresAuth = ({ children }) => {
  const { authState, isClerkLoaded, isClerkSignedIn } = useContext(AuthContext);
  const location = useLocation();

  if (isClerkLoaded === false) {
    return <Loader />;
  }

  const isAuthenticated = Boolean(isClerkSignedIn || authState?.token);

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export { RequiresAuth };
