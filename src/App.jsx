import { useState, React } from 'react'
import { Routes, Route} from "react-router-dom"
import './App.css'
import Login from './Pages/Login/Login'
import Members from './Pages/Members/Members'
import IsPrivate from './components/IsPrivate.jsx';
import MemberProfile from './Pages/MemberProfile/MemberProfile.jsx'
import AccessBlocked from './Pages/AccessBlocked/AccessBlocked.jsx'
import NonExistent from './Pages/NonExistent/NonExistent.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="*" element={<NonExistent/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path="/members" exact element={<IsPrivate><Members/></IsPrivate>}/>
        <Route path="/members/:id" exact element={<IsPrivate><MemberProfile/></IsPrivate>}/>
        <Route path="/access-blocked" exact element={<AccessBlocked/>} />
      </Routes>
    </>
  )
}

export default App
