import React from 'react'
import LogIn from './Components/LogIn'
import DashBoard from './Components/Dashboard';
import { Routes,Route } from "react-router-dom";

const App = () => {

  return (
    <div>
      <Routes>
      <Route path="/" element={<LogIn/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      </Routes>
    </div>
  )
}

export default App
