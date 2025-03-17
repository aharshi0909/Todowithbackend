import React from 'react'
import { getAuth, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { app } from '../config' 

const auth = getAuth(app)

export default function SignOut({ changeUser }) {
  const navigate = useNavigate()

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        changeUser() 
        navigate('/login') 
      })
      .catch((error) => {
        console.error("Sign Out Error:", error.code, error.message)
      })
  }

  return (
    <button className="signout-button" onClick={handleSignOut}>
      Sign Out
    </button>
  )
}