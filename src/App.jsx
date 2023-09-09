import "./App.css";
import { Routes, Route } from "react-router-dom";
import LeaderRetreat from "./components/LeaderRetreat/LeaderRetreat";
import LeaderRetreatRegister from "./components/LeaderRetreat/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LeaderRetreat />} />
      <Route path="/register" element={<LeaderRetreatRegister />} />
    </Routes>
  );
}

export default App;
