import { useContext, useEffect } from "react";
import { AuthContext } from "../../index.js";
import { useNavigate, useLocation } from "react-router-dom";
import { SignIn } from "@clerk/react";
import "./LoginStyle.css";

const Login = () => {
  const { userLogged, authState, isClerkSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTarget = location?.state?.from?.pathname || "/";

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isClerkSignedIn || authState?.token) {
      navigate(redirectTarget, { replace: true });
    }
  }, [isClerkSignedIn, authState?.token, navigate, redirectTarget]);

  const guestUserData = {
    email: "vishal@gmail.com",
    password: "vishal1234",
  };

  const handleGuestLogin = () => {
    userLogged(guestUserData);
  };

  return (
    <div className="login-page-container">
      <div className="login-clerk-wrapper">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/signup"
          fallbackRedirectUrl={redirectTarget}
        />
        <div className="guest-login-card">
          <div className="guest-login-divider">
            <span>OR QUICK ACCESS</span>
          </div>
          <button
            type="button"
            className="guest-login-btn"
            onClick={handleGuestLogin}
          >
            ⚡ Continue as Guest (1-Click Demo)
          </button>
        </div>
      </div>
    </div>
  );
};

export { Login };
