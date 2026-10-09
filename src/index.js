import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/react";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProivider, AuthContext } from "./Contexts/AuthContext";
import { ProductProvider, ProductContext } from "./Contexts/ProductContext";

export { AuthContext, ProductContext };

// Call make Server
makeServer();

const PUBLISHABLE_KEY =
  process.env.REACT_APP_CLERK_PUBLISHABLE_KEY ||
  process.env.VITE_CLERK_PUBLISHABLE_KEY ||
  "pk_test_YXJyaXZpbmctZWFyd2lnLTkzMTkuY2xlcmsuYWNjb3VudHMuZGV2JA";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Router>
        <AuthProivider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </AuthProivider>
      </Router>
    </ClerkProvider>
  </React.StrictMode>
);
