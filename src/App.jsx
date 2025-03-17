import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import Main from './Components/Main'
import CreateTask from './Components/CreateTask'
import Home from './Components/Home'
import User from './Components/User'
import React, { useState } from 'react'

export default function App() {
  const [userObj, setUserObj] = useState(null)

  const changeUserObj = (obj) => setUserObj(obj)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login changeUser={changeUserObj} />} />
        <Route path="/main" element={<Main userObj={userObj} />} />
        <Route path="/create" element={<CreateTask userObj={userObj} />} />
        <Route path='/user' element={<User userObj={userObj} />} />
      </Routes>
    </BrowserRouter>
  )
}