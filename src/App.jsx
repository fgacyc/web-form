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
import InterviewerDetail from './components/InterviewerDetail/InterviewerDetail';
import Attendance from './components/Attendance/Attendance';
import LeaderRegistration from './components/Registration/LeaderRegistration/LeaderRegistration';
import LeaderRegistrationSuccess from './components/Registration/LeaderRegistration/LeaderRegistrationSuccess';
import MemberRegistration from './components/Registration/MemberRegistration/MemberRegistration';
import OrientationConfirmation from "./components/orientation/OrientationConfirmation.jsx";

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
      <Route path='recruiter' element={<InterviewerDetail />} />
      <Route path='recruiter/:RID' element={<InterviewerDetail />} />
      <Route path='attendance' element={<Attendance />}/>
      <Route path='orientation_confirmation/:RID' element={<OrientationConfirmation />}/>
      <Route path='leader_registration' element={<LeaderRegistration />} />
      <Route path='leader_reg_success' element={<LeaderRegistrationSuccess />} />
      <Route path='member_registration' element={<MemberRegistration />} />
    </Routes>
  )
}

export default App
