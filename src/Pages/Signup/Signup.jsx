import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignUp } from "@clerk/react";
import { AuthContext } from "../../Contexts/AuthContext";
import "./SignupStyle.css";

const Signup = () => {
  const { authState, isClerkSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isClerkSignedIn || authState?.token) {
      navigate("/", { replace: true });
    }
  }, [isClerkSignedIn, authState?.token, navigate]);

  return (
    <div className="signup-page-container">
      <div className="signup-clerk-wrapper">
        <SignUp
          routing="path"
          path="/signup"
          signInUrl="/login"
          fallbackRedirectUrl="/"
        />
      </div>
    </div>
  );
};

export { Signup };
