import "./App.css";
import { Routes, Route } from "react-router-dom";
import LeaderRetreat from "./components/LeaderRetreat/LeaderRetreat";
import LeaderRetreatRegister from "./components/LeaderRetreat/Register";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

function App() {
  const { getAccessTokenSilently, user, isLoading } = useAuth0();

  useEffect(() => {
    if (isLoading) return;

    user &&
      getAccessTokenSilently().then((tkn) =>
        sessionStorage.setItem("fgacyc-auth-token", tkn)
      );
  }, [getAccessTokenSilently, isLoading, user]);

  return (
    <Routes>
      <Route path="/" element={<LeaderRetreat />} />
      <Route path="/register" element={<LeaderRetreatRegister />} />
    </Routes>
  );
}

export default App;
