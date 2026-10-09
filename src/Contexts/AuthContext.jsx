import { createContext, useEffect, useReducer, useState, useRef } from "react";
import { AuthReducer } from "../Reducer/AuthReducer.jsx";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/react";

const sign = require("jwt-encode");

export const AuthContext = createContext();

export const AuthProivider = ({ children }) => {
  const getInitialUser = () => {
    try {
      const stored = localStorage.getItem("user");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const getInitialAddress = () => {
    try {
      const stored = localStorage.getItem("address");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const initialAuthState = {
    user: getInitialUser(),
    token: localStorage.getItem("token") || "",
    address: getInitialAddress(),
  };

  const [authState, authDispatch] = useReducer(AuthReducer, initialAuthState);
  const [loader, setLoader] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    isLoaded: isClerkLoaded,
    isSignedIn: isClerkSignedIn,
    user: clerkUser,
  } = useUser();
  const { signOut: clerkSignOut } = useClerk();
  const prevClerkSignedInRef = useRef(isClerkSignedIn);

  // Sync Clerk authenticated user with application state
  useEffect(() => {
    if (!isClerkLoaded) return;

    if (isClerkSignedIn && clerkUser) {
      const email =
        clerkUser.primaryEmailAddress?.emailAddress ||
        (clerkUser.emailAddresses && clerkUser.emailAddresses[0]?.emailAddress) ||
        "";
      const firstName = clerkUser.firstName || clerkUser.username || "Clerk";
      const lastName = clerkUser.lastName || "User";
      const appUser = {
        _id: clerkUser.id,
        firstName,
        lastName,
        email,
        imageUrl: clerkUser.imageUrl,
        isClerk: true,
      };

      const jwtSecret =
        process.env.REACT_APP_JWT_SECRET || "minute_watch_store_jwt_secret";
      const token = sign(
        {
          _id: clerkUser.id,
          email,
          firstName,
          lastName,
        },
        jwtSecret
      );

      localStorage.setItem("user", JSON.stringify(appUser));
      localStorage.setItem("token", token);
      authDispatch({ type: "setUser", payload: appUser });
      authDispatch({ type: "setToken", payload: token });
    } else if (prevClerkSignedInRef.current && !isClerkSignedIn) {
      // User signed out from Clerk
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("address");
      authDispatch({ type: "setUser", payload: {} });
      authDispatch({ type: "setToken", payload: "" });
      authDispatch({ type: "setAddress", payload: [] });
    }
    prevClerkSignedInRef.current = isClerkSignedIn;
  }, [isClerkLoaded, isClerkSignedIn, clerkUser]);

  const userLogged = async (loginData) => {
    if (loginData.email && loginData.password !== "") {
      try {
        const config = {
          method: "POST",
          body: JSON.stringify(loginData),
        };
        const res = await fetch("/api/auth/login", config);
        const resJson = await res.json();
        if (res.status === 200) {
          localStorage.setItem("user", JSON.stringify(resJson?.foundUser));
          localStorage.setItem("token", resJson?.encodedToken);
          localStorage.setItem(
            "address",
            JSON.stringify(resJson?.foundUser?.address)
          );
          authDispatch({ type: "setUser", payload: resJson?.foundUser });
          authDispatch({ type: "setToken", payload: resJson?.encodedToken });
          authDispatch({
            type: "setAddress",
            payload: resJson?.foundUser?.address,
          });
          toast.success("Login Successfully!");
          navigate(
            location?.state?.from?.pathname
              ? location?.state?.from?.pathname
              : "/"
          );
        } else {
          console.log(resJson?.errors[0]);
          toast.error(resJson?.errors[0]);
        }
      } catch (err) {
        userLogout();
        console.log(err.message);
        toast.error(err.message);
      }
    } else {
      toast.error("Please enter valid input!");
    }
  };

  const userLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("address");
    authDispatch({ type: "setUser", payload: {} });
    authDispatch({ type: "setToken", payload: "" });
    authDispatch({ type: "setAddress", payload: [] });

    try {
      if (isClerkSignedIn && clerkSignOut) {
        await clerkSignOut();
      }
    } catch (err) {
      console.error("Clerk signOut error:", err);
    }

    toast.success("You're logged out!");
    navigate("/");
  };

  const userSignup = async (signupData) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify(signupData),
      });
      const resJson = await res.json();
      if (res.status === 201) {
        localStorage.setItem("user", JSON.stringify(resJson?.createdUser));
        localStorage.setItem("signupToken", resJson?.encodedToken);
        authDispatch({
          type: "setUser",
          payload: resJson?.createdUser,
        });
        authDispatch({ type: "setToken", payload: resJson?.encodedToken });
        toast.success("Signup Successful!");
        navigate("/");
      } else if (res.status === 422) {
        console.log(resJson.errors[0]);
        toast.error(resJson.errors[0]);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    const getUserAddress = async () => {
      const encodedToken = authState?.token;
      if (encodedToken && encodedToken.length !== 0) {
        try {
          const res = await fetch("/api/user/address", {
            headers: {
              authorization: encodedToken,
            },
          });
          const resJson = await res?.json();

          if (res.status === 200) {
            localStorage.setItem("address", JSON.stringify(resJson?.address));
            authDispatch({ type: "setAddress", payload: resJson?.address });
          }
        } catch (err) {
          console.log(err);
        }
      }
    };
    getUserAddress();
  }, [authState?.token]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        userLogged,
        userLogout,
        userSignup,
        loader,
        setLoader,
        isClerkLoaded,
        isClerkSignedIn,
        clerkUser,
        clerkSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
