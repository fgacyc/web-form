import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { FirebaseAppProvider } from "reactfire";
import { firebaseConfig } from "./lib/firebase/index.js";

const domain = import.meta.env["VITE_AUTH0_DOMAIN"];
const clientId = import.meta.env["VITE_AUTH0_CLIENT_ID"];
const audience = import.meta.env["VITE_AUTH0_AUDIENCE"];
const scope = import.meta.env["VITE_AUTH0_SCOPE"];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
          scope: scope,
        }}
        cacheLocation="localstorage"
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
