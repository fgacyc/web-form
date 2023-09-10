import "./App.css";
import { Routes, Route } from "react-router-dom";
import LeaderRetreat from "./components/LeaderRetreat/LeaderRetreat";
import LeaderRetreatRegister from "./components/LeaderRetreat/Register";
import { getFirestore } from "firebase/firestore";
import { FirestoreProvider, useFirebaseApp } from "reactfire";

function App() {
  const firestoreInstance = getFirestore(useFirebaseApp());
  return (
    <Routes>
      <Route path="/" element={<LeaderRetreat />} />
      <Route
        path="/register"
        element={
          <FirestoreProvider sdk={firestoreInstance}>
            <LeaderRetreatRegister />
          </FirestoreProvider>
        }
      />
    </Routes>
  );
}

export default App;
