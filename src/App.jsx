import './App.css'
import {  Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home'
import Start from './components/StartPage/Start'
import Landing from './components/LandingPage/Landing'

function App() {
  return (
    // <Routes>
    //   <Route path='/' element={<Start/>} />
    //   <Route path='/landing' element={<Landing/>} />
    // </Routes>
    <Home />
  )
}

export default App
