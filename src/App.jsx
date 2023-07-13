import './App.css'
import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home'
import Team from './components/Team/Team'
import Search from './components/Search/Search';
import Selection from './components/SelectionPage/Selection';
import Complete from './components/Complete/Complete';
import Submission from './components/Submission/Submission';
import Appointment from './components/AppointmentPage/Appointment';
import Milestone from './components/MilestonePage/Milestone';

function clearDepartment() {
  localStorage.removeItem('cyc-department-selected');
}


function App() {
  useEffect(() => {
    clearDepartment();
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/team' element={<Team />} />
      <Route path='/team/:team' element={<Team />} />
      <Route path='/team/:team/:sectionNum' element={<Team />} />
      <Route path='/search' element={<Search />} />
      <Route path='/selection' element={<Selection />} />
      <Route path='/complete' element={<Complete />} />
      <Route path='/form' element={<Submission />} />
      <Route path='/appointment' element={<Appointment />} />
      <Route path='/appointment/:date/:RID' element={<Appointment />} />
      <Route path='milestone' element={<Milestone />} />
      <Route path='milestone/:RID' element={<Milestone />} />
    </Routes>
  )
}

export default App
